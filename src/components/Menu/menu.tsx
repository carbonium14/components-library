import React, { createContext, useState } from "react";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";
type MenuMode = 'horizontal' | 'vertical'
type SelectCallBack = (selectedIndex:string) => void
export interface MenuProps {
  defaultIndex?: string,
  className?: string,
  mode?: MenuMode,
  style?: React.CSSProperties,
  onSelect?: SelectCallBack,
  children?: React.ReactNode,
  defaultOpenSubMenus?: string[]
}
interface IMenuContext {
  index: string,
  onSelect?: SelectCallBack,
  mode?: MenuMode,
  defaultOpenSubMenus?: string[]
}
export const MenuContext = createContext<IMenuContext>({
  index: '0'
})
export const Menu:React.FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect, defaultOpenSubMenus } = props
  const [currentActive, setActive] = useState(defaultIndex)
  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical'
  })
  const handleClick = (index:string) => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }
  const passedContext:IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus
  }
  const renderChidren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: index.toString()
        })
      } else {
        console.error('错误, Menu的子组件不是MenuItem或SubItem')
      }
    })
  }
  return <ul className={classes} style={style} data-testid='test-menu'>
    <MenuContext.Provider value={passedContext}>
      {renderChidren()}
    </MenuContext.Provider>
  </ul>
}
Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: []
}
export default Menu