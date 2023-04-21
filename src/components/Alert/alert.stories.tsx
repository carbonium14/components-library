import { StoryFn, Meta } from '@storybook/react'
import Alert from './alert'
const alertMeta:Meta<typeof Alert> = {
  title: 'Alert',
  component: Alert,
  tags: ['autodocs']
}
export default alertMeta
const Template: StoryFn<typeof Alert> = (args) => (
  <Alert {...args}></Alert>
)
export const DefaultAlert = Template.bind({})
DefaultAlert.args = {
  title: 'this is alert!'
}
DefaultAlert.storyName = '基本样式'
export const CDescAlert = Template.bind({})
CDescAlert.args = {
  title: '标题',
  description: '描述'
}
CDescAlert.storyName = '带描述的提示'
export const BStylesAlert = () => {
  return (
    <>
      <Alert title="this is Success" type="success"></Alert>
      <Alert title="this is Danger!" type="danger"></Alert>
      <Alert title="this is Warning!" type="warning" closable={false}></Alert>
    </>
  )
}
BStylesAlert.storyName = '不同样式的提示'