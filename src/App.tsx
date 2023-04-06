import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Alert from './components/Alert/alert';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
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
    <Menu defaultIndex={'0'} onSelect={(index) => {alert(index)}}>
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
    <Menu defaultIndex={'0'} onSelect={(index) => {alert(index)}} mode='vertical' defaultOpenSubMenus={['2']}>
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
  </>
}

export default App;
