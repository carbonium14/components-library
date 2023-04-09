import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Alert from './components/Alert/alert';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Tab from './components/Tabs/tab';
import TabItem from './components/Tabs/tabItem';
import Icon from './components/Icon/icon';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)
function App() {
  return <>
    <Button>hello</Button>
    <Button disabled>hello</Button>
    <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>hello</Button>
    <Button btnType={ButtonType.Primary} size={ButtonSize.Small}>hello</Button>
    <Button btnType={ButtonType.Default} size={ButtonSize.Large}>hello</Button>
    <Button btnType={ButtonType.Default} size={ButtonSize.Small}>hello</Button>
    <Button btnType={ButtonType.Danger} size={ButtonSize.Large}>hello</Button>
    <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>hello</Button>
    <Button btnType={ButtonType.Link} href='https://www.baidu.com'>baidu</Button>
    <Button btnType={ButtonType.Link} href='https://www.baidu.com' disabled>baidu</Button>
    <div style={{margin: '10px auto', width: '700px'}}>
      <Alert title='标题' closable={false}  type='success' description='描述'></Alert>
      <Alert title='标题' closable onClose={() => {}} type='danger' description='描述'></Alert>
      <Alert title='标题' type='default' description='描述'></Alert>
      <Alert title='标题' type='warning' description='描述'></Alert>
    </div>
    <Menu defaultIndex={'0'} onSelect={(index) => {console.log(index)}}>
      <MenuItem>
        普通的菜单
      </MenuItem>
      <MenuItem disabled>
        屏蔽的菜单
      </MenuItem>
      <SubMenu title='dropdown'>
        <MenuItem>
          下拉菜单
        </MenuItem>
        <MenuItem>
          单击即可出现
        </MenuItem>
      </SubMenu>
      <MenuItem>
        <a href='https://www.baidu.com'>baidu</a>
      </MenuItem>
    </Menu>
    <Menu defaultIndex={'0'} onSelect={(index) => {console.log(index)}} mode='vertical' defaultOpenSubMenus={['2']}>
      <MenuItem>
        普通的菜单
      </MenuItem>
      <MenuItem disabled>
        屏蔽的菜单
      </MenuItem>
      <SubMenu title='自动打开的submenu'>
        <MenuItem>
          下拉菜单
        </MenuItem>
        <MenuItem>
          可以自动出现
        </MenuItem>
      </SubMenu>
      <SubMenu title='不会自动打开的submenu'>
        <MenuItem>
          下拉菜单
        </MenuItem>
        <MenuItem>
          单击即可出现
        </MenuItem>
      </SubMenu>
      <MenuItem>
        <a href='https://www.baidu.com'>baidu</a>
      </MenuItem>
    </Menu>
    <Tab defaultIndex={0} onSelect={(index) => console.log(index)}>
      <TabItem label={'label1'}>label1</TabItem>
      <TabItem label={<span style={{color: 'red'}}>span标签</span>}>span</TabItem>
      <TabItem label={'disabled'} disabled>disabled</TabItem>
    </Tab>
    <Tab defaultIndex={0} onSelect={(index) => console.log(index)} type='card'>
      <TabItem label={'label1'}>label1</TabItem>
      <TabItem label={<span style={{color: 'red'}}>span标签</span>}>span</TabItem>
      <TabItem label={'disabled'} disabled>disabled</TabItem>
    </Tab>
    <Icon icon="coffee" theme='danger' size='10x'></Icon>
    <Icon icon="coffee" theme='primary' size='10x'></Icon>
  </>
}

export default App;
