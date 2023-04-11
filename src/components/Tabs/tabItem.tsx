import React from 'react'
export interface TabItemProps {
  label: string | React.ReactElement,
  disabled?: boolean,
  children?: React.ReactNode
}
export const TabItem:React.FC<TabItemProps> = (props) => {
  const { children } = props
  return <div className='tab-panel'>
    {children}
  </div>
}
export default TabItem