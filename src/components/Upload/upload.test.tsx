import axios from 'axios'
import { render, RenderResult, fireEvent, waitFor } from '@testing-library/react'
import { Upload, UploadProps } from './upload'
jest.mock('../Icon/icon', () => {
  return (props: any) => {
    return <span onClick={props.onClick}>{props.icon}</span>
  }
})
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const testProps: UploadProps = {
  action: "fakeurl.com",
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true
}
let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement
const testFile = new File(['xyz'], 'test.png', {type: 'image/png'})
describe('测试upload', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    wrapper = render(<Upload {...testProps}>Click to upload</Upload>)
    // eslint-disable-next-line testing-library/no-node-access
    fileInput = wrapper.container.querySelector('.file-input') as HTMLInputElement
    // eslint-disable-next-line testing-library/prefer-screen-queries
    uploadArea = wrapper.queryByText('Click to upload') as HTMLElement
  })
  it('upload process工作正常', async () => {
    const { queryByText, getByText } = wrapper
    mockedAxios.post.mockResolvedValue({'data': 'cool'})
    expect(uploadArea).toBeInTheDocument()
    expect(fileInput).not.toBeVisible()
    fireEvent.change(fileInput, { target: { files: [testFile ]}})
    // eslint-disable-next-line testing-library/prefer-screen-queries, testing-library/prefer-presence-queries
    expect(queryByText('spinner')).toBeInTheDocument()
    await waitFor(() => {
      // eslint-disable-next-line testing-library/prefer-screen-queries, testing-library/prefer-presence-queries
      expect(queryByText('test.png')).toBeInTheDocument()
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions, testing-library/prefer-screen-queries, testing-library/prefer-presence-queries
      expect(queryByText('check-circle')).toBeInTheDocument()
    })
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', expect.objectContaining({
      raw: testFile,
      status: 'success',
      response: 'cool',
      name: 'test.png'
    }))
    expect(testProps.onChange).toHaveBeenCalledWith(expect.objectContaining({
      raw: testFile,
      status: 'success',
      response: 'cool',
      name: 'test.png'
    }))
    // eslint-disable-next-line testing-library/prefer-screen-queries, testing-library/prefer-presence-queries
    expect(queryByText('times')).toBeInTheDocument()
    // eslint-disable-next-line testing-library/prefer-screen-queries
    fireEvent.click(getByText('times'))
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(queryByText('test.png')).not.toBeInTheDocument()
    expect(testProps.onRemove).toHaveBeenCalledWith(expect.objectContaining({
      raw: testFile,
      status: 'success',
      name: 'test.png'
    }))
  })
  it('拖拽文件工作正常', async () => {
    mockedAxios.post.mockResolvedValue({'data': 'cool'})
    fireEvent.dragOver(uploadArea)
    expect(uploadArea).toHaveClass('is-dragover')
    fireEvent.dragLeave(uploadArea)
    expect(uploadArea).not.toHaveClass('is-dragover')
    fireEvent.drop(uploadArea, {
      dataTransfer: {
        files: [testFile]
      }
    })
    await waitFor(() => {
      // eslint-disable-next-line testing-library/prefer-screen-queries, testing-library/prefer-presence-queries
      expect(wrapper.queryByText('test.png')).toBeInTheDocument()
    })
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', expect.objectContaining({
      raw: testFile,
      status: 'success',
      response: 'cool',
      name: 'test.png'
    }))
  })
})