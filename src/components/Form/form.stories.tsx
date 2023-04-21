import { useRef } from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Form, { IFormRef } from './form'
import Item from './formItem'
import Input from '../Input/input'
import Button, { ButtonType } from '../Button/button'
import Select from '../Select/select'
import Option from '../Select/option'
import { CustomRule } from './useStore'
const meta: Meta<typeof Form> = { 
  title: 'Form',
  component: Form,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '550px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    }
  }
}
export default meta
const confirmRules: CustomRule[] = [
  { type: 'string',required: true, min: 3, max: 8 },
  ({ getFieldValue }) => ({
    asyncValidator(rule, value) {
      return new Promise((resolve, reject) => {
        if (value !== getFieldValue('password')) {
          reject('The two passwords that you entered do not match!')
        }
        setTimeout(() => {
          resolve()
        }, 1000)
      })

    }
  })
]
export const ABasicForm:StoryFn<typeof Form> = (args) => {
  return (
    <Form {...args} >
      <Item label='用户名' name='name' rules={[{type: 'string',required: true, min: 3}]}>
        <Input/>
      </Item>
      <Item label='密码' name='password' rules={[{type: 'string',required: true, min: 3, max: 8 }]}>
        <Input type="password"/>
      </Item>
      <div className='form-submit-area'>
        <Button type="submit" btnType={ButtonType.Primary}>登录</Button>
      </div>
    </Form>
  )
}
ABasicForm.storyName = '基本的登录表单'
export const BRegForm:StoryFn<typeof Form> = (args) => { 
  const initialValues = {
    agreement: false
  }
  return (
    <Form {...args} initialValues={initialValues}>
      <Item label='邮件' name='email' rules={[{ type: 'email',required: true }]}>
        <Input/>
      </Item>
      <Item label='密码' name='password' rules={[{type: 'string',required: true, min: 3, max: 8 }]}>
        <Input type="password"/>
      </Item>
      <Item label='性别' name='gender' rules={[{type: 'string',required: true }]} getValueFromEvent={(e) => e } valuePropName='defaultValue'>
        <Select placeholder="请选择性别">
          <Option value="男" />
          <Option value="女" />
        </Select>
      </Item>
      <div className='agreement-section' style={{ 'display': 'flex', 'justifyContent': 'center'}}>
        <Item name='agreement' rules={[{ type: 'enum', enum: [true], message: '请同意协议'}]} getValueFromEvent={(e) => e.target.checked } valuePropName='checked'>
          <input type="checkbox"/>
        </Item>
        <span className="agree-text">注册即代表你同意<a href='https://www.baidu.com'>用户协议</a></span>
      </div>
      <div className='form-submit-area'>
        <Button type="submit" btnType={ButtonType.Primary}>登录</Button>
      </div>
    </Form>
  )
}
BRegForm.storyName = '注册表单,支持多种 FormItem 组件'
export const CFullForm:StoryFn<typeof Form> = (args) => {
  const ref = useRef<IFormRef>(null)
  const resetAll = () => {
    ref.current?.resetFields()
  }
  return (
    <Form initialValues={{ username: 'test', agreement: false }} {...args} ref={ref}>
      { ({ isValid, isSubmitting }) => <>
        <Item label='用户名' name='username' rules={[{ type: 'email', required: true }]}>
          <Input/>
        </Item>
        <Item label='密码' name='password' rules={[{type: 'string', required: true, min: 3, max: 8 }]}>
          <Input type='password'/>
        </Item>
        <Item label='重复密码' name='confirmPwd' rules={confirmRules}>
          <Input type='password'/>
        </Item>
        <div className='agreement-section' style={{ 'display': 'flex', 'justifyContent': 'center'}}>
          <Item name='agreement' valuePropName='checked' getValueFromEvent={(e) => e.target.checked} rules={[{ type: 'enum', enum: [true], message: '请同意协议'}]}>
            <input type="checkbox"/>
          </Item>
          <span className="agree-text">注册即代表你同意<a href='https://www.baidu.com'>用户协议</a></span>
        </div>
        <div className='form-submit-area'>
          <Button type="submit" btnType={ButtonType.Primary}>登录 {isSubmitting ? '验证中' : '验证完毕'} {isValid ? '通过😄' : '没通过😢'} </Button>
          <Button type="button" onClick={resetAll}>重置</Button>
        </div>
      </>}
    </Form>
  )
}
CFullForm.storyName = '自定义规则,调用表单实例'