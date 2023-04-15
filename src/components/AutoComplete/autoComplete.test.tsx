import { config } from 'react-transition-group'
import { render, RenderResult, fireEvent, waitFor } from '@testing-library/react'
import { AutoComplete, AutoCompleteProps, DataSourceType } from './autoComplete'
config.disabled = true
jest.mock('../Icon/icon', () => {
  return (props: any) => {
    return <span onClick={props.onClick}>{props.icon}</span>
  }
})
const testArray = [
  {value: 'ab', number: 11},
  {value: 'abc', number: 1},
  {value: 'b', number: 4},
  {value: 'c', number: 15},
]
const renderOptions = (item: DataSourceType) => {
  const itemWithNumber = item as DataSourceType<{ value: string; number: number }>
  return (
    <>name: {itemWithNumber.value}</>
  )
}
const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) => {return testArray.filter(item => item.value.includes(query))},
  onSelect: jest.fn(),
  placeholder: 'auto-complete',
}
const testPropsWithCustomRender: AutoCompleteProps = {
  ...testProps,
  placeholder: 'auto-complete-2',
  renderOptions
}
let wrapper: RenderResult, inputNode: HTMLInputElement
describe('测试AutoComplete', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    wrapper = render(<AutoComplete {...testProps}/>)
    // eslint-disable-next-line testing-library/prefer-screen-queries
    inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
  })
  it('测试基础行为', async () => {
    fireEvent.change(inputNode, {target: { value: 'a'}})
    await waitFor(() => {
      // eslint-disable-next-line testing-library/prefer-screen-queries, testing-library/prefer-presence-queries
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    // eslint-disable-next-line testing-library/no-node-access
    expect(wrapper.container.querySelectorAll('.suggestion-item').length).toEqual(2)
    // eslint-disable-next-line testing-library/prefer-screen-queries
    fireEvent.click(wrapper.getByText('ab'))
    expect(testProps.onSelect).toHaveBeenCalledWith({value: 'ab', number: 11})
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
    expect(inputNode.value).toBe('ab')
  })
  it('测试键盘输入', async () => {
    fireEvent.change(inputNode, {target: { value: 'a'}})
    await waitFor(() => {
      // eslint-disable-next-line testing-library/prefer-screen-queries, testing-library/prefer-presence-queries
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const firstResult = wrapper.queryByText('ab')
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const secondResult = wrapper.queryByText('abc')
    fireEvent.keyDown(inputNode, { code: 'ArrowDown' })
    expect(firstResult).toHaveClass('is-active')
    fireEvent.keyDown(inputNode, { code: 'ArrowDown' })
    expect(secondResult).toHaveClass('is-active')
    fireEvent.keyDown(inputNode, { code: 'ArrowUp' })
    expect(firstResult).toHaveClass('is-active')
    fireEvent.keyDown(inputNode, { code: 'Enter' })
    expect(testProps.onSelect).toHaveBeenCalledWith({value: 'ab', number: 11})
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })
  it('外面点击应该收起', async () => {
    fireEvent.change(inputNode, {target: { value: 'a'}})
    await waitFor(() => {
      // eslint-disable-next-line testing-library/prefer-screen-queries, testing-library/prefer-presence-queries
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    fireEvent.click(document)
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })
  it('renderOption应该生成正确的模版', async () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const wrapper = render(<AutoComplete {...testPropsWithCustomRender}/>)
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const inputNode = wrapper.getByPlaceholderText('auto-complete-2') as HTMLInputElement
    fireEvent.change(inputNode, {target: { value: 'a'}})
    await waitFor(() => {
      // eslint-disable-next-line testing-library/prefer-screen-queries, testing-library/prefer-presence-queries
      expect(wrapper.queryByText('name: ab')).toBeInTheDocument()
    })
  })
  it('异步fetchSuggestions应该正常运行', async () => {
    const testPropsWithPromise: AutoCompleteProps = {
      ...testProps,
      fetchSuggestions: jest.fn((query) => { return Promise.resolve(testArray.filter(item => item.value.includes(query))) }),
      placeholder: 'auto-complete-3',
    }
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const wrapper = render(<AutoComplete {...testPropsWithPromise}/>)
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const inputNode = wrapper.getByPlaceholderText('auto-complete-3') as HTMLInputElement
    fireEvent.change(inputNode, {target: { value: 'a'}})
    await waitFor(() => {
      expect(testPropsWithPromise.fetchSuggestions).toHaveBeenCalled()
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions, testing-library/prefer-screen-queries, testing-library/prefer-presence-queries
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
  })
})