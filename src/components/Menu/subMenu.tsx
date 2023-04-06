import React, { useContext, useState, FunctionComponentElement } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import { MenuItemProps } from "./menuItem";
interface SubMenuProps {
  index?: string,
  title: string,
  className?: string,
  children?: React.ReactNode
}
const SubMenu:React.FC<SubMenuProps> = ({ index, title, className, children }) => {
  const context = useContext(MenuContext)
  const openSubMenus = context.defaultOpenSubMenus as Array<string>
  const isOpend = (index && context.mode === 'vertical') ? openSubMenus.includes(index) : false
  const [menuOpen, setMenuOpen] = useState(isOpend)
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index
  })
  const handleClick = (e:React.MouseEvent) => {
    e.preventDefault()
    setMenuOpen(!menuOpen)
  }
  let timer:any = null
  const handleMouse = (e:React.MouseEvent, toggle:boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setMenuOpen(toggle)
    }, 300);
  }
  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}
  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e:React.MouseEvent) => { handleMouse(e, true) },
    onMouseLeave: (e:React.MouseEvent) => { handleMouse(e, false) }
  } : {}
  const renderChildren = () => {
    const subMenuClasses = classNames('submenu', {
      'menu-opened': menuOpen
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`
        })
      } else {
        console.error('错误, SubMenu里面只能是MenuItem')
      }
    })
    return <ul className={subMenuClasses}>
      {childrenComponent}
    </ul>
  }
  return <li key={index} className={classes} {...hoverEvents}>
    <div className="submenu-title" {...clickEvents}>{title}</div>
    {renderChildren()}
  </li>
}
SubMenu.displayName = 'SubMenu'
export default SubMenu