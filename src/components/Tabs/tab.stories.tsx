import { StoryFn, Meta } from '@storybook/react'
import Tabs from './tab'
import TabItem from './tabItem'
import Icon from '../Icon/icon'
export default {
  title: 'tabs',
  component: Tabs,
  subcomponents: { 
    'TabItem': TabItem 
  }
} as Meta<typeof Tabs>
export const ADefaultTabs: StoryFn<typeof Tabs> = (args) => (
  <Tabs {...args}>
    <TabItem label="选项卡一">选项卡一</TabItem>
    <TabItem label="选项卡二">选项卡二</TabItem>
    <TabItem label="用户管理">用户管理</TabItem>
  </Tabs>
)
ADefaultTabs.storyName = '默认的标签'
export const BCardTabs: StoryFn<typeof Tabs> = (args) => (
  <Tabs {...args} type="card">
    <TabItem label='card1'>card1</TabItem>
    <TabItem label="card2">card2</TabItem>
    <TabItem label="disabled" disabled>disabled</TabItem>
  </Tabs> 
)
BCardTabs.storyName = '选项卡样式的标签'
export const CCustomTabs: StoryFn<typeof Tabs> = (args) => (
  <Tabs {...args} type="card">
    <TabItem label={<><Icon icon="check-circle" />自定义图标</>}>自定义图标</TabItem>
    <TabItem label="tab2">tab2</TabItem>
  </Tabs> 
)
CCustomTabs.storyName = '自定义选项卡样式'
