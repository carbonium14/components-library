import { StoryFn, Meta } from '@storybook/react'
import Button, { ButtonType, ButtonSize } from './button'
export default {
  title: 'Button',
  component: Button
} as Meta<typeof Button>
const Template: StoryFn<typeof Button> = (args) => (
  <Button {...args}></Button>
)
export const ADefault = Template.bind({})
ADefault.args = {
  children: 'Default Button',
}
ADefault.storyName = '默认按钮样式'
export const BButtonWithSize = () => (
  <>
    <Button size={ButtonSize.Large}> large button </Button>
    <Button size={ButtonSize.Small}> small button </Button>
  </>
)
BButtonWithSize.storyName = '不同尺寸的按钮'
export const CButtonWithType = () => (
  <>
    <Button btnType={ButtonType.Primary}> primary button </Button>
    <Button btnType={ButtonType.Danger}> danger button </Button>
    <Button btnType={ButtonType.Link} href="https://www.baidu.com"> link button </Button>
  </>
)
CButtonWithType.storyName = '不同类型的按钮'