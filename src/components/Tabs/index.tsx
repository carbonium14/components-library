import { FC } from 'react'
import Tabs, { TabProps } from './tab'
import TabItem, { TabItemProps } from './tabItem'
export type ITabsComponent = FC<TabProps> & {
  Item: FC<TabItemProps>
}
const TransTabs = Tabs as ITabsComponent
TransTabs.Item = TabItem
export default TransTabs