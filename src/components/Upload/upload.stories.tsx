import { Meta, StoryFn } from '@storybook/react'
import { Upload } from './upload'
import Button, { ButtonSize, ButtonType } from '../Button/button'
import Icon from '../Icon/icon'
export default { 
  title: 'Upload',
  tags: ['autodocs'],
  component: Upload,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    }
  }
} as Meta<typeof Upload>
export const ASimpleUpload:StoryFn<typeof Upload> = (args) => (
  <Upload {...args} action="https://www.mocky.io/v2/5cc8019d300000980a055e76">
    <Button size={ButtonSize.Large} btnType={ButtonType.Primary}><Icon icon="upload" /> 点击上传 </Button>
  </Upload>  
)
ASimpleUpload.storyName = '普通的上传组件'
export const BCheckUpload:StoryFn<typeof Upload> = (args) => {
  const checkFileSize = (file: File) => {
    if (Math.round(file.size / 1024) > 50) {
      alert('file too big')
      return false;
    }
    return true;
  }
  return (
    <Upload {...args} action="https://www.mocky.io/v2/5cc8019d300000980a055e76" beforeUpload={checkFileSize}>
      <Button size={ButtonSize.Large} btnType={ButtonType.Primary}><Icon icon="upload" /> 不能传大于50Kb! </Button>
    </Upload>  
  )
}
BCheckUpload.storyName = '上传前检查文件大小'
export const CDragUpload:StoryFn<typeof Upload> = (args) => (
  <Upload {...args} action="https://www.mocky.io/v2/5cc8019d300000980a055e76" name="fileName" multiple drag>
    <Icon icon="upload" size="5x" theme="secondary" />
    <br/>
    <p>点击或者拖动到此区域进行上传</p>
  </Upload>
)
CDragUpload.storyName = '拖动上传'