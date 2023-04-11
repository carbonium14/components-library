import { Meta } from '@storybook/react'
import Icon from './icon'
import Button, { ButtonSize, ButtonType } from '../Button/button'
export default { 
  title: 'Icon',
  id: 'Icon',
  component: Icon,
} as Meta<typeof Icon>
export const ADefaultIcons = () => (
  <>
    <Icon icon="check" size="3x"/>
    <Icon icon="times" size="3x"/>
    <Icon icon="anchor" size="3x"/>
    <Icon icon="trash" size="3x"/>
    <Button size={ButtonSize.Large} btnType={ButtonType.Primary}><Icon icon="check"/> check </Button>
  </>
)
ADefaultIcons.storyName = "默认图标"
export const BThemeIcons = () => (
  <>
    <Icon icon="check" size="3x" theme="success"/>
    <Icon icon="times" size="3x" theme="danger"/>
    <Icon icon="anchor" size="3x" theme="primary"/>
    <Icon icon="exclamation-circle" size="3x" theme="warning" />
  </>
)
BThemeIcons.storyName = "不同主题的图标"
export const CCustomIcons = () => (
  <>
    <Icon icon="spinner" size="3x" theme="primary" spin/>
    <Icon icon="spinner" size="3x" theme="success" pulse/>
  </>
)
CCustomIcons.storyName = "更多行为的图标"