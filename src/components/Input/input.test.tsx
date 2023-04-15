import { render, fireEvent } from '@testing-library/react'
import { Input, InputProps } from './input'
const defaultProps: InputProps = {
  onChange: jest.fn(),
  placeholder: 'test-input'
}
describe('Input组件', () => {
  it('正确挂载Input组件', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const wrapper = render(<Input {...defaultProps}/>)
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const testNode = wrapper.getByPlaceholderText('test-input') as HTMLInputElement
    expect(testNode).toBeInTheDocument()
    expect(testNode).toHaveClass('input-inner')
    fireEvent.change(testNode, { target: { value: '23' } })
    expect(defaultProps.onChange).toHaveBeenCalled()
    expect(testNode.value).toEqual('23')
  })
  it('设置disabled的时候应该不可见', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const wrapper = render(<Input disabled placeholder="disabled"/>)
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const testNode = wrapper.getByPlaceholderText('disabled') as HTMLInputElement
    expect(testNode.disabled).toBeTruthy()
  })
  it('设置不同的大小', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const wrapper = render(<Input placeholder="sizes" size="lg" />)
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const testContainer = wrapper.container.querySelector('.input-wrapper')
    expect(testContainer).toHaveClass('input-size-lg')
  })
  it('设置prepend和append应该正确挂载', () => {
    const {queryByText, container } = render(<Input placeholder="pend" prepend="https://" append=".com"/>)
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const testContainer = container.querySelector('.input-wrapper')
    expect(testContainer).toHaveClass('input-group input-group-append input-group-prepend')
    // eslint-disable-next-line testing-library/prefer-screen-queries, testing-library/prefer-presence-queries
    expect(queryByText('https://')).toBeInTheDocument()
    // eslint-disable-next-line testing-library/prefer-screen-queries, testing-library/prefer-presence-queries
    expect(queryByText('.com')).toBeInTheDocument()
  })
})