import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps, ButtonSize, ButtonType } from "./button"
const defaultProps = {
  onClick: jest.fn()
}
const testProps:ButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: 'klass'
}
const disabledProps:ButtonProps = {
  disabled: true,
  onClick: jest.fn()
}
describe('button组件测试', () => {
  it('什么都不加应该是default', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const wrapper = render(<Button {...defaultProps}>test</Button>)
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const element = wrapper.getByText('test') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeFalsy()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
  it('添加不同props显示不同的组件', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const wrapper = render(<Button {...testProps}>test</Button>)
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const element = wrapper.getByText('test')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn btn-primary btn-lg klass')
  })
  it('设置为link时应该是link', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const wrapper = render(<Button btnType={ButtonType.Link} href="https://www.baidu.com">link</Button>)
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const element = wrapper.getByText('link')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  })
  it('disable属性是应该是不可用的button', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const wrapper = render(<Button {...disabledProps}>test</Button>)
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const element = wrapper.getByText('test') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})