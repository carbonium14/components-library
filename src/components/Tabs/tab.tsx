import React, { useState, FunctionComponentElement } from 'react'
import classNames from 'classnames'
import { TabItemProps } from './tabItem'
export interface TabProps {
  defaultIndex?: number,
  className?: string,
  onSelect?: (selectedIndex:number) => void,
  type?: 'line' | 'card',
  children?: React.ReactNode
}
export const Tab:React.FC<TabProps> = (props) => {
  const { defaultIndex, className, onSelect, type, children } = props
  const [activeIndex, setActiveIndex] = useState(defaultIndex)
  const handleClick = (e:React.MouseEvent, index:number, disabled?:boolean) => {
    if (!disabled) {
      setActiveIndex(index)
      if (onSelect) {
        onSelect(index)
      }
    }
  }
  const navClass = classNames('tabs-nav', {
    'nav-line': type === 'line',
    'nav-card': type === 'card'
  })
  const renderNavLinks = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<TabItemProps>
      const { label, disabled } = childElement.props
      const classes = classNames('tabs-nav-item', {
        'is-active': activeIndex === index,
        'disabled': disabled
      })
      return <li className={classes} key={`nav-item-${index}`} onClick={(e) => handleClick(e, index, disabled)}>
        {label}
      </li>
    })
  }
  const renderContent = () => {
    return React.Children.map(children, (child, index) => {
      if (index === activeIndex) {
        return child
      }
    })
  }
  return <div className={`tabs ${className}`}>
    <ul className={navClass}>
      {renderNavLinks()}
    </ul>
    <div className='tabs-content'>
      {renderContent()}
    </div>
  </div>
}
Tab.defaultProps = {
  defaultIndex: 0,
  type: 'line'
}
export default Tab