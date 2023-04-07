import { fireEvent, render, RenderResult } from '@testing-library/react'
import Tab, { TabProps } from './tab'
import TabItem from './tabItem'
const testProps:TabProps = {
  defaultIndex: 1,
  onSelect: jest.fn()
}
let wrapper:RenderResult | null = null
describe('Tab和TabItem组件测试', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    wrapper = render(
      <Tab {...testProps}>
        <TabItem label="tab1">content1</TabItem>
        <TabItem label="tab2">content2</TabItem>
        <TabItem label="disabled" disabled>content3</TabItem>
      </Tab>
    )
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('正确挂载default Tab', () => {
    // eslint-disable-next-line testing-library/no-node-access
    expect(wrapper?.container.querySelector('.tabs-nav')).toHaveClass('nav-line')
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const activeElement = wrapper?.queryByText('tab2')
    expect(activeElement).toBeInTheDocument()
    expect(activeElement).toHaveClass('is-active')
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(wrapper?.queryByText('tab1')).not.toHaveClass('is-active')
    // eslint-disable-next-line testing-library/prefer-screen-queries, testing-library/prefer-presence-queries
    expect(wrapper?.queryByText('content2')).toBeInTheDocument()
    // eslint-disable-next-line testing-library/prefer-screen-queries, testing-library/prefer-presence-queries
    expect(wrapper?.queryByText('content1')).not.toBeInTheDocument()
  })
  it('单击切换内容', () => {
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const clickedElement = wrapper?.queryByText('tab1') as HTMLElement
    fireEvent.click(clickedElement)
    expect(clickedElement).toHaveClass('is-active')
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(wrapper?.queryByText('tab2')).not.toHaveClass('is-active')
    // eslint-disable-next-line testing-library/prefer-screen-queries, testing-library/prefer-presence-queries
    expect(wrapper?.queryByText('content2')).not.toBeInTheDocument()
    // eslint-disable-next-line testing-library/prefer-screen-queries, testing-library/prefer-presence-queries
    expect(wrapper?.queryByText('content1')).toBeInTheDocument()
    expect(testProps.onSelect).toHaveBeenCalledWith(0)
  })
  it('单击disabled的Tabitem应该不起作用', () => {
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const disabledElement = wrapper?.queryByText('disabled') as HTMLElement
    expect(disabledElement).toHaveClass('disabled')
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalled()
  })
})