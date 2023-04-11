import { StoryFn, Meta } from '@storybook/react'
import Menu from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'
export default {
  title: 'Menu',
  id: 'Menu',
  component: Menu,
  subcomponents: { 
    'SubMenu': SubMenu, 
    'Item': MenuItem 
  }
} as Meta<typeof Menu>
export const ADefaultMenu: StoryFn<typeof Menu> = (args) => (
  <Menu defaultIndex='0' {...args} >
    <MenuItem>
      项目一
    </MenuItem>
    <MenuItem>
      项目二
    </MenuItem>
    <MenuItem disabled>
      禁止使用
    </MenuItem> 
    <SubMenu title="下拉选项">
      <MenuItem>
        下拉选项一
      </MenuItem>
      <MenuItem>
        下拉选项二
      </MenuItem>    
    </SubMenu>
  </Menu>
)
ADefaultMenu.storyName = '默认菜单'
export const BClickMenu: StoryFn<typeof Menu> = (args) => (
  <Menu {...args} defaultIndex='0' mode="vertical">
    <MenuItem>
      项目一
    </MenuItem>
    <MenuItem>
      项目二
    </MenuItem>
    <SubMenu title="点击下拉选项">
      <MenuItem>
        下拉选项一
      </MenuItem>
      <MenuItem>
        下拉选项二
      </MenuItem>    
    </SubMenu>
  </Menu>
)
BClickMenu.storyName = '纵向的菜单'
export const COpenedMenu:StoryFn<typeof Menu> = (args) => (
  <Menu {...args} defaultIndex='0' mode="vertical" defaultOpenSubMenus={['2']}>
    <MenuItem>
      项目一
    </MenuItem>
    <MenuItem>
      项目二
    </MenuItem>
    <SubMenu title="默认展开下拉选项">
      <MenuItem>
        下拉选项一
      </MenuItem>
      <MenuItem>
        下拉选项二
      </MenuItem>    
    </SubMenu>
  </Menu>
)
COpenedMenu.storyName = '默认展开的纵向菜单'