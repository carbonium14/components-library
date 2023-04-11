import React from "react"
import classNames from "classnames"
export enum ButtonSize {
  Large = 'lg',
  Small = 'sm'
}
export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}
interface BaseButtonProps {
  className?: string,
  /**设置 Button 的禁用 */
  disabled?: boolean,
  /**设置 Button 的尺寸 */
  size?: ButtonSize,
  /**设置 Button 的类型 */
  btnType?: ButtonType,
  children: React.ReactNode,
  href?: string
}
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互，支持 HTML button 和 a 链接 的所有属性
 * ### 引用方法
 * 
 * ```javascript
 * import { Button } from 'componments-library'
 * ```
 */
export const Button:React.FC<ButtonProps> = (props) => {
  const { btnType, disabled, size, children, href, className, ...restprops } = props
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === ButtonType.Link) && disabled
  })
  if (btnType === ButtonType.Link && href) {
    return <a className={classes} href={href} {...restprops}>{children}</a>
  } else {
    return <button className={classes} disabled={disabled} {...restprops}>{children}</button>
  }
}
Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default
}
export default Button