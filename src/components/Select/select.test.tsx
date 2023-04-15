import { config } from 'react-transition-group'
import { render, fireEvent } from '@testing-library/react'
import Select, { SelectProps } from './select'
import Option from './option'
config.disabled = true
jest.mock('../Icon/icon', () => {
  return (props: any) => {
    return <span onClick={props.onClick}>{props.icon}</span>
  }
})
const testProps: SelectProps = {
  defaultValue: '',
  placeholder: 'test',
  onChange: jest.fn(),
  onVisibleChange: jest.fn(),
}
const multipleProps: SelectProps = {
  ...testProps,
  multiple: true,
}
describe('测试Select组件', () => {
  it('应该正确挂载', () => {
    const { getByPlaceholderText, getByText } = render(
      <Select {...testProps}>
        <Option value="id1" label="nihao"/>
        <Option value="id2" label="nihao2"/>
        <Option value="id3" disabled label="disabled"/>
      </Select>
    )
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const inputEle = getByPlaceholderText('test') as HTMLInputElement
    expect(inputEle).toBeInTheDocument()
    fireEvent.click(inputEle)
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const firstItem = getByText('nihao')
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const disabledItem = getByText('disabled')
    expect(firstItem).toBeInTheDocument()
    expect(testProps.onVisibleChange).toHaveBeenCalledWith(true)
    fireEvent.click(disabledItem)
    expect(disabledItem).toBeInTheDocument()
    fireEvent.click(firstItem)
    expect(firstItem).not.toBeInTheDocument()
    expect(testProps.onVisibleChange).toHaveBeenCalledWith(false)
    expect(testProps.onChange).toHaveBeenCalledWith('id1', ['id1'])
    expect(inputEle.value).toEqual('id1')
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.activeElement).toEqual(inputEle)
  })
  it('多选模式应该生效', () => {
    const { getByPlaceholderText, getByText, container } = render(
      <Select {...multipleProps}>
        <Option value="id1" label="first"/>
        <Option value="id2" label="second"/>
        <Option value="id3" label="third"/>
      </Select>
    )
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const inputEle = getByPlaceholderText('test') as HTMLInputElement
    fireEvent.click(inputEle)
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const firstItem = getByText('first')
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const secondItem = getByText('second')
    fireEvent.click(firstItem)
    expect(firstItem).toBeInTheDocument()
    expect(firstItem).toHaveClass('is-selected')
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByText('check')).toBeInTheDocument()
    expect(multipleProps.onChange).toHaveBeenCalledWith('id1', ['id1'])
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelectorAll('.tag').length).toEqual(1)
    expect(inputEle.placeholder).toEqual('')
    fireEvent.click(secondItem)
    expect(multipleProps.onChange).toHaveBeenLastCalledWith('id2', ['id1', 'id2'])
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelectorAll('.tag').length).toEqual(2)
    fireEvent.click(secondItem)
    expect(secondItem).not.toHaveClass('is-selected')
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelectorAll('.tag').length).toEqual(1)
    expect(multipleProps.onChange).toHaveBeenLastCalledWith('id2', ['id1'])
    // eslint-disable-next-line testing-library/prefer-screen-queries
    fireEvent.click(getByText('times'))
    expect(multipleProps.onChange).toHaveBeenLastCalledWith('id1', [])
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelectorAll('.tag').length).toEqual(0)
    expect(inputEle.placeholder).toEqual('test')
  })
})