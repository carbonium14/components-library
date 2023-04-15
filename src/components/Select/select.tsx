import React, { FunctionComponentElement, createContext, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import useClickOutside from "../../hooks/useClickOutside";
import Input from "../Input/input";
import Transition from "../Transition/transition";
import Icon from "../Icon/icon";
import { SelectOptionProps } from "./option";
export interface SelectProps {
  defaultValue?: string | string[],
  placeholder?: string,
  disabled?: boolean,
  multiple?: boolean,
  name?: string,
  onChange?: (selectedValue: string, selectedValued: string[]) => void,
  onVisibleChange?: (visible: boolean) => void,
  children?: React.ReactElement | React.ReactElement[]
}
export interface ISelectContext {
  onSelect?: (value: string, isSelected: boolean) => void,
  selectedValues: string[],
  multiple?: boolean
}
export const SelectContext = createContext<ISelectContext>({ selectedValues: []})
export const Select:React.FC<SelectProps> = (props) => {
  const { defaultValue, placeholder, disabled, multiple, name, onChange, onVisibleChange, children } = props
  const input = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLInputElement>(null)
  const containerWidth = useRef(0)
  const [selectedValues, setSelectedValues] = useState<string[]>(Array.isArray(defaultValue) ? defaultValue : [])
  const [menuOpen, setMenuOpen] = useState(false)
  const [value, setValue] = useState(typeof defaultValue === 'string' ? defaultValue : '')
  const handleOptionClick = (value: string, isSelected?: boolean) => {
    if (!multiple) {
      setMenuOpen(false)
      setValue(value)
      if (onVisibleChange) {
        onVisibleChange(false)
      }
    } else {
      setValue('')
    }
    let updatedValues = [value]
    if (multiple) {
      updatedValues = isSelected ? selectedValues.filter((v) => v !== value) : [...selectedValues, value]
      setSelectedValues(updatedValues)
    }
    if (onChange) {
      onChange(value, updatedValues)
    }
  }
  useEffect(() => {
    if (input.current) {
      input.current.focus()
      if (multiple && selectedValues.length > 0) {
        input.current.placeholder = ''
      } else {
        if (placeholder) {
          input.current.placeholder = placeholder
        }
      }
    }
  }, [multiple, placeholder, selectedValues.length])
  useEffect(() => {
    if (containerRef.current) {
      containerWidth.current = containerRef.current.getBoundingClientRect().width
    }
  })
  useClickOutside(containerRef, () => {
    setMenuOpen(false)
    if (onVisibleChange && menuOpen) {
      onVisibleChange(false)
    }
  })
  const passedContext: ISelectContext = {
    onSelect: handleOptionClick,
    selectedValues,
    multiple
  }
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!disabled) {
      setMenuOpen(!menuOpen)
      if (onVisibleChange) {
        onVisibleChange(!menuOpen)
      }
    }
  }
  const generateOptions = () => {
    return React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<SelectOptionProps>
      if (childElement.type.displayName === 'Option') {
        return React.cloneElement(childElement, {
          index: `select-${i}`
        })
      } else {
        console.error('错误, Select组件的子节点必须是Option')
      }
    })
  }
  const containerClass = classNames('select', {
    'menu-is-open': menuOpen,
    'is-disabled': disabled,
    'is-multiple': multiple,
  })
  return <div className={containerClass} ref={containerRef}>
    <div className="select-input" onClick={handleClick}>
      <Input ref={input} placeholder={placeholder} value={value} readOnly icon="angle-down" disabled={disabled} name={name}></Input>
    </div>
    <SelectContext.Provider value={passedContext}>
      <Transition in={menuOpen} animation="zoom-in-top" timeout={300}>
        <ul className="select-dropdown">
          {generateOptions()}
        </ul>
      </Transition>
    </SelectContext.Provider>
    {multiple && <div className="selected-tags" style={{maxWidth: containerWidth.current - 32}}> 
      {selectedValues.map((value, index) => {
        return <span className="tag" key={`tag-${index}`}>
          {value}
          <Icon icon="times" onClick={() => {handleOptionClick(value, true)}} />
        </span>})}
      </div>}
  </div>
}
Select.defaultProps = {
  name: 'select',
  placeholder: '请选择'
}
export default Select