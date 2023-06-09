import { useState, useReducer } from "react"
import Schema, { RuleItem, ValidateError } from "async-validator"
import mapValues from 'lodash-es/mapValues'
import each from 'lodash-es/each'
export type CustomRuleFunc = ({ getFieldValue }: any) => RuleItem
export type CustomRule = RuleItem | CustomRuleFunc
export interface FieldDetail {
  name: string,
  value: string,
  rules: CustomRule[],
  isValid: boolean,
  errors: ValidateError[]
}
export interface FieldsState {
  [key: string]: FieldDetail
}
export interface ValidateErrorType extends Error{
  errors: ValidateError[],
  fields: Record<string, ValidateError[]>
}
export interface FormState {
  isValid: boolean,
  isSubmitting: boolean,
  errors: Record<string, ValidateError[]>
}
export interface FieldsAction {
  type: 'addField' | 'updateValue' | 'updateValidateResult',
  name: string,
  value: any
}
function fieldsReducers(state: FieldsState, action:FieldsAction):FieldsState {
  switch(action.type) {
    case 'addField':
      return {
        ...state,
        [action.name]: {
          ...action.value
        }
      }
    case 'updateValue': 
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          value: action.value
        }
      }
    case 'updateValidateResult':
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          isValid: action.value.isValid,
          errors: action.value.errors
        }
      }
    default:
      return state
  }
}
function useStore(initialValues?:Record<string, any>) {
  const [form, setForm] = useState<FormState>({
    isValid: true,
    isSubmitting: false,
    errors: {}
  })
  const [fields, dispatch] = useReducer(fieldsReducers, {})
  const getFieldValue = (key: string) => {
    return fields[key] && fields[key].value
  }
  const getFieldsValue = () => {
    return mapValues(fields, (item) => item.value)
  }
  const setFieldValue = (name: string, value: any) => {
    if (fields[name]) {
      dispatch({
        type: 'updateValue',
        name,
        value
      })
    }
  }
  const resetFields = () => {
    if (initialValues) {
      each(initialValues, (value, name) => {
        if (fields[name]) {
          dispatch({
            type: 'updateValue',
            name,
            value
          })
        }
      })
    }
  }
  const transformRules = (rules: CustomRule[]) => {
    return rules.map((rule) => {
      if (typeof rule === 'function') {
        const calledRule = rule({getFieldValue})
        return calledRule
      } else {
        return rule
      }
    })
  }
  const validateField = async (name: string) => {
    const {value, rules} = fields[name]
    const afterRules = transformRules(rules)
    const descriptor = {
      [name]: afterRules
    }
    const valueMap = {
      [name]: value
    }
    const validator = new Schema(descriptor)
    let isValid = true
    let errors:ValidateError[] = []
    try {
      await validator.validate(valueMap)
    } catch (error) {
      isValid = false
      const err = error as ValidateErrorType
      errors = err.errors
    } finally {
      dispatch({
        type: 'updateValidateResult',
        name,
        value: {
          isValid,
          errors
        }
      })
    }
  }
  const validateAllField = async () => {
    let isValid = true
    let errors:Record<string, ValidateError[]> = {}
    const valueMap = mapValues(fields, (item) => item.value)
    const descriptor = mapValues(fields, (item) => transformRules(item.rules))
    const validator = new Schema(descriptor)
    setForm({
      ...form,
      isSubmitting: true
    })
    try {
      await validator.validate(valueMap)
    } catch (error) {
      isValid = false
      const err = error as ValidateErrorType
      errors = err.fields
      each(fields, (value, name) => {
        if (errors[name]) {
          const itemErrors = errors[name]
          dispatch({
            type: 'updateValidateResult',
            name,
            value: {
              isValid: false,
              errors: itemErrors
            }
          })
        } else if (value.rules.length > 0 && !errors[name]) {
          dispatch({
            type: 'updateValidateResult',
            name,
            value: {
              isValid: true,
              errors: []
            }
          })
        }
      })
    } finally {
      setForm({
        ...form,
        isSubmitting: false,
        isValid,
        errors
      })
      return {
        isValid,
        errors,
        values: valueMap
      }
    }
  }
  return {
    fields,
    dispatch,
    form,
    validateField,
    validateAllField,
    getFieldValue,
    getFieldsValue,
    setFieldValue,
    resetFields
  }
}
export default useStore