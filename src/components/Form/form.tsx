import React, { createContext, useImperativeHandle } from "react";
import useStore, { FormState } from "./useStore";
import { ValidateError } from "async-validator"
export type RenderProps = (form:FormState) => React.ReactNode
export interface FormProps {
  name?: string,
  initialValues?: Record<string, any>,
  onFinish?: (values:Record<string, any>) => void,
  onFinishFailed?: (values:Record<string, any>, errors:Record<string, ValidateError[]>) => void,
  children?: React.ReactNode | RenderProps
}
export type IFormContext = Pick<ReturnType<typeof useStore>, 'dispatch' | 'fields' | 'validateField'> & Pick<FormProps, 'initialValues'>
export type IFormRef = Omit<ReturnType<typeof useStore>, 'fields' | 'dispatch' | 'form'>
export const FormContext = createContext<IFormContext>({} as IFormContext)
export const Form = React.forwardRef<IFormRef, FormProps>((props, ref) => {
  const {name, initialValues, onFinish, onFinishFailed, children} = props
  const {form, fields, dispatch, ...restProps} = useStore(initialValues)
  const {validateField, validateAllField} = restProps
  useImperativeHandle(ref, () => {
    return {
      ...restProps
    }
  })
  const passedContext:IFormContext = {
    dispatch,
    fields,
    initialValues,
    validateField
  }
  const submitForm = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const {isValid, errors, values} = await validateAllField()
    if (isValid && onFinish) {
      onFinish(values)
    } else if (!isValid && onFinishFailed) {
      onFinishFailed(values, errors)
    }
  }
  let childrenNode:React.ReactNode
  if (typeof children === 'function') {
    childrenNode = children(form)
  } else {
    childrenNode = children
  }
  return <form name={name} className="form" onSubmit={submitForm}>
    <FormContext.Provider value={passedContext}>
      {childrenNode}
    </FormContext.Provider>
  </form>
})
Form.defaultProps = {
  name: 'form'
}
export default Form