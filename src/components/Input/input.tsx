import React, { ReactElement, InputHTMLAttributes, ChangeEvent, forwardRef } from "react";
import classNames from "classnames";
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from "../Icon/icon";
type InputSize = 'lg' | 'sm'
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  disabled?: boolean,
  size?: InputSize,
  icon?: IconProp,
  prepend?: string | ReactElement,
  append?: string | ReactElement,
  onChange?: (e:ChangeEvent<HTMLInputElement>) => void
}
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { disabled, size, icon, prepend, append, style, ...restprops } = props
  const classes = classNames('input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
  })
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }
  if ('value' in props) {
    delete props.defaultValue
    restprops.value = fixControlledValue(props.value)
  }
  return <div className={classes} style={style}>
    {prepend && <div className="input-group-prepend">{prepend}</div>}
    {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`}></Icon></div>}
    <input ref={ref} className="input-inner" disabled={disabled} {...restprops}></input>
    {append && <div className="input-group-append">{append}</div>}
  </div>
})
export default Input