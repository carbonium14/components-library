import { fireEvent, render, RenderResult, cleanup, waitFor } from '@testing-library/react'
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'
const testProps:MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
}
const testVerticalProps:MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
  defaultOpenSubMenus: ['4']
}
const generateMenu = (props:MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>
        active
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem>
        xyz
      </MenuItem>
      <SubMenu title='dropdown'>
        <MenuItem>
          drop1
        </MenuItem>
      </SubMenu>
      <SubMenu title='open'>
        <MenuItem>
          open1
        </MenuItem>
      </SubMenu>
    </Menu>
  )
}
const createStyleFile = () => {
  const cssFile:string = `
    .submenu {
      display: none;
    }
    .submenu.menu-opened {
      display: block;
    }
  `
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = cssFile
  return style
}
let wrapper:RenderResult | null = null
let wrapper2: RenderResult| null = null
let menuElement:HTMLElement | null = null
let activeElement:HTMLElement | null = null
let disabledElement:HTMLElement | null = null
describe('Menu和MenuItem组件测试', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    wrapper = render(generateMenu(testProps)) as RenderResult
    wrapper.container.append(createStyleFile())
    // eslint-disable-next-line testing-library/prefer-screen-queries
    menuElement = wrapper.getByTestId('test-menu') as HTMLElement
    // eslint-disable-next-line testing-library/prefer-screen-queries
    activeElement = wrapper.getByText('active') as HTMLElement
    // eslint-disable-next-line testing-library/prefer-screen-queries
    disabledElement = wrapper.getByText('disabled') as HTMLElement
  })
  it('应该挂载正确并且有default值', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('menu test')
    // eslint-disable-next-line testing-library/no-node-access
    expect(menuElement?.querySelectorAll(':scope > li').length).toEqual(5)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })
  it('单击MenuItem应该改变active状态并且调用onselect', () => {
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const thirdItem = wrapper?.getByText('xyz') as HTMLElement
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    fireEvent.click(disabledElement as HTMLElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenNthCalledWith(1)
  })
  it('mode设置为vertical时应该是vertical状态', () => {
    cleanup()
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const wrapper = render(generateMenu(testVerticalProps))
    // eslint-disable-next-line testing-library/prefer-screen-queries
    menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
  it('鼠标经过的时候应该展示SubMenu', async () => {
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(wrapper?.queryByText('drop1')).not.toBeVisible()
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const dropdownElement = wrapper?.getByText('dropdown') as HTMLElement
    fireEvent.mouseEnter(dropdownElement)
    await waitFor(() => {
      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(wrapper?.queryByText('drop1')).toBeVisible()
    })
    // eslint-disable-next-line testing-library/prefer-screen-queries
    fireEvent.click(wrapper?.getByText('drop1') as HTMLElement)
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    fireEvent.mouseLeave(dropdownElement)
    await waitFor(() => {
      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(wrapper?.queryByText('drop1')).not.toBeVisible()
    })
  })
})
describe('在vertical模式进行测试', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    wrapper2 = render(generateMenu(testVerticalProps))
    wrapper2.container.append(createStyleFile())
  })
  it('应该挂载正确并且有vertical值', () => {
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const menuElement = wrapper2?.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
  it('vertical模式下单击SubMenu应该展开', () => {
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const dropDownItem = wrapper2?.queryByText('drop1')
    expect(dropDownItem).not.toBeVisible()
    // eslint-disable-next-line testing-library/prefer-screen-queries
    fireEvent.click(wrapper2?.getByText('dropdown') as HTMLElement)
    expect(dropDownItem).toBeVisible()
  })
  it('当defaultOpenSubMenus包含输入的index时应该自动展开', () => {
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(wrapper2?.queryByText('open1')).toBeVisible()
  })
})