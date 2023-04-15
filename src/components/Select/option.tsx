import React, { useContext } from "react";
import classNames from "classnames";
import { SelectContext } from "./select";
import Icon from "../Icon/icon";
export interface SelectOptionProps {
  index?: string,
  value: string,
  label?: string,
  disabled?: boolean,
  children?: React.ReactElement
}
export const Option:React.FC<SelectOptionProps> = (props) => {
  const { index, value, label, disabled, children } = props
  const { onSelect, selectedValues, multiple } = useContext(SelectContext)
  const isSelected = selectedValues.includes(value)
  const classes = classNames('select-item', {
    'is-disabled': disabled,
    'is-selected': isSelected,
  })
  const handleClick = (e: React.MouseEvent, value: string, isSelected: boolean) => {
    e.preventDefault()
    if (onSelect && !disabled) {
      onSelect(value, isSelected)
    }
  }
  return <li key={index} className={classes} onClick={(e) => {handleClick(e, value, isSelected)}}>
    {children || (label ? label : value)}
    {multiple && isSelected && <Icon icon="check"/>}
  </li>
}
Option.displayName = 'Option'
export default Option