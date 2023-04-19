import React, { useContext, useEffect } from "react";
import classNames from "classnames";
import { FormContext } from './form'
import { CustomRule } from "./useStore";
export type SomeRequired<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>
export interface FormItemProps {
  name: string,
  label?: string,
  children?: React.ReactNode,
  valuePropName?: string,
  trigger?: string,
  getValueFromEvent?: (event:any) => any,
  rules?: CustomRule[],
  validateTrigger?: string
}
export const FormItem:React.FC<FormItemProps> = (props) => {
  const {name, label, children, valuePropName, trigger, getValueFromEvent, rules, validateTrigger} = props as SomeRequired<FormItemProps, 'getValueFromEvent' | 'trigger' | 'valuePropName' | 'validateTrigger'>
  const {dispatch, fields, initialValues, validateField} = useContext(FormContext)
  useEffect(() => {
    const value = (initialValues && initialValues[name]) || ''
    dispatch({
      type: 'addField',
      name,
      value: {
        label,
        name,
        value,
        errors: [],
        rules: rules || [],
        isValid: true
      }
  })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const rowClass = classNames('row', {
    'row-no-label': !label
  })
  const fieldState = fields[name]
  const value = fieldState && fieldState.value
  const errors = fieldState && fieldState.errors
  const isRequired = rules?.some((rule) => typeof rule !== 'function' && rule.required)
  const hasError = errors && errors.length > 0
  const labelClass = classNames({
    'form-item-required': isRequired
  })
  const itemClass = classNames('form-item-control', {
    'form-item-has-error': hasError
  })
  const onValueUpdate = (e:any) => {
    const value = getValueFromEvent(e)
    dispatch({
      type: 'updateValue',
      name,
      value
    })
  }
  const onValueValidate = async () => {
    await validateField(name)
  }
  const controlProps:Record<string, any> = {}
  controlProps[valuePropName] = value
  controlProps[trigger] = onValueUpdate
  if (rules) {
    controlProps[validateTrigger] = onValueValidate
  }
  const childList = React.Children.toArray(children)
  if (childList.length === 0) {
    console.error('必须要有子组件')
  }
  if (childList.length > 1) {
    console.warn('子组件只能由一个')
  }
  if (!React.isValidElement(childList[0])) {
    console.error('必须是React组件')
  }
  const child = childList[0] as React.ReactElement
  const returnChildNode = React.cloneElement(child, { ...child.props, ...controlProps })
  return <div className={rowClass}>
    {label && <div className="form-item-label">
      <label title={label} className={labelClass}>
        {label}
      </label>  
    </div>}
    <div className="form-item">
      <div className={itemClass}>
        {returnChildNode}
      </div>
      {hasError && <div className="form-item-explain">
        <span>{errors[0].message}</span>
      </div>}
    </div>
  </div>
}
FormItem.defaultProps = {
  valuePropName: 'value',
  trigger: 'onChange',
  validateTrigger: 'onBlur',
  getValueFromEvent: (e) => e.target.value
}
export default FormItem