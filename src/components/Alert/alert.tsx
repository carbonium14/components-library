import React, { useState } from 'react'
import classNames from 'classnames'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'
export type AlertType = 'success' | 'default' | 'danger' | 'warning'
export interface AlertProps {
  title: string,
  description?: string,
  type?: AlertType,
  onClose?: () => void,
  closable?: boolean
}
export const Alert:React.FC<AlertProps> = (props) => {
  const [hide, setHide] = useState(false)
  const {title, description, type, onClose, closable} = props
  const classes = classNames('alert', {
    [`alert-${type}`]: type,
  })
  const titleClass = classNames('alert-title', {
    'bold-title': description
  })
  const handleOnClose = (e:React.MouseEvent) => {
    if (onClose) {
      onClose()
    }
    setHide(true)
  }
  return <Transition in={!hide} timeout={300} animation='zoom-in-top'>
    <div className={classes}>
      <span className={titleClass}>{title}</span>
      {description && <p className='alert-desc'>{description}</p>}
      {closable && <span className='alert-close' onClick={handleOnClose}>
        <Icon icon="times"></Icon>
      </span>}
    </div>
  </Transition>
}
Alert.defaultProps = {
  type: 'default',
  closable: true,
}
export default Alert