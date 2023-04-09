import { render, fireEvent } from '@testing-library/react'
import Alert, { AlertProps } from './alert'
import { config } from 'react-transition-group'
config.disabled = true
jest.mock('../Icon/icon', () => {
  return (props: any) => {
    return <span>{props.icon}</span>
  }
})
const testProps:AlertProps = {
  title: 'title',
  onClose: jest.fn()
}
const typeProps:AlertProps = {
  ...testProps,
  type: 'success',
  description: 'hello',
  closable: false
}
describe('alert组件测试', () => {
  it('默认导入default的alert', () => {
    const { getByText, container, queryByText } = render(<Alert {...testProps}/>)
    // eslint-disable-next-line testing-library/prefer-screen-queries, testing-library/prefer-presence-queries
    expect(queryByText('title')).toBeInTheDocument()
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('.alert')).toHaveClass('alert-default')
    // eslint-disable-next-line testing-library/prefer-screen-queries
    fireEvent.click(getByText('times'))
    expect(testProps.onClose).toHaveBeenCalled()
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(queryByText('title')).not.toBeInTheDocument()
  })
  it('设置props时应该生效', () => {
    const { container, queryByText } = render(<Alert {...typeProps}/>)
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(queryByText('title')).toHaveClass('bold-title')
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('.alert')).toHaveClass('alert-success')
    // eslint-disable-next-line testing-library/prefer-screen-queries, testing-library/prefer-presence-queries
    expect(queryByText('hello')).toBeInTheDocument()
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(queryByText('x')).not.toBeInTheDocument()
  })
})