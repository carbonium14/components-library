import React, { useState, ChangeEvent, KeyboardEvent, ReactElement, useEffect, useRef } from "react";
import Input, { InputProps } from "../Input/input";
import Icon from "../Icon/icon";
import useDebounce from "../../hooks/useDebounce";
import classNames from "classnames";
import useClickOutside from "../../hooks/useClickOutside";
import Transition from '../Transition/transition'
interface DataSourceObject {
  value: string
}
export type DataSourceType<T = {}> = T & DataSourceObject
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'>{
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>,
  onSelect?: (item: DataSourceType) => void,
  renderOptions?: (item: DataSourceType) => ReactElement
}
export const AutoComplete:React.FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, renderOptions ,...restprops } = props
  const [inputValue, setInputValue] = useState(value as string)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const [showDropdown, setShowDropdown] = useState(false)
  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)
  const debouncedValue = useDebounce(inputValue, 500)
  useClickOutside(componentRef, () => {
    setSuggestions([])
  })
  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      setSuggestions([])
      const results = fetchSuggestions(debouncedValue)
      if (results instanceof Promise) {
        setLoading(true)
        results.then(data => {
          setLoading(false)
          setSuggestions(data)
          if (data.length > 0) {
            setShowDropdown(true)
          }
        })
      } else {
        setSuggestions(results)
        setShowDropdown(true)
        if (results.length > 0) {
          setShowDropdown(true)
        } 
      }
    } else {
      setShowDropdown(false)
    }
    setHighlightIndex(-1)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue])
  const highlight = (index: number) => {
    if (index < 0) {
      index = 0
    }
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setHighlightIndex(index)
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch(e.code) {
      case 'Enter':
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break
      case 'ArrowUp':
        highlight(highlightIndex - 1)
        break
      case 'ArrowDown':
        highlight(highlightIndex + 1)
        break
      case 'Escape':
        setSuggestions([])
        break
      default:
        break
    }
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setSuggestions([])
    if (onSelect) {
      onSelect(item)
    }
    triggerSearch.current = false
  }
  const renderTemplate = (item: DataSourceType) => {
    return renderOptions ? renderOptions(item) : item.value
  }
  const generateDropdown = () => {
    return <Transition in={showDropdown || loading} animation="zoom-in-top" timeout={300} onExited={() => {setSuggestions([])}}>
      <ul className="suggestion-list">
        {suggestions.map((item, index) => {
          const classes = classNames('suggestion-item', {
            'is-active': index === highlightIndex
          })
          return <li key={index} onClick={() => handleSelect(item)} className={classes}>
            {renderTemplate(item)}
          </li>})}
      </ul>
    </Transition>
  }
  return <div className="auto-complete" ref={componentRef}>
    <Input value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown} {...restprops}></Input>
    {loading && <ul><Icon icon={"spinner"} spin></Icon></ul>}
    {suggestions.length > 0 && generateDropdown()}
  </div>
}
export default AutoComplete