import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import Form, { FormProps } from './form'
import Item from './formItem'
import Input from '../Input/input'
import Button, { ButtonType } from '../Button/button'
const testProps: FormProps = {
  name: 'test-form',
  initialValues: { name: 'viking', password: '12345', confirmPwd: '23456' },
  onFinish: jest.fn(),
  onFinishFailed: jest.fn()
}
let nameInput: HTMLInputElement, pwdInput: HTMLInputElement, conPwdInput:HTMLInputElement, submitButton: HTMLButtonElement
describe('Form测试', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <Form {...testProps}>
        <Item label='Name' name='name' 
          rules={[{type: 'string', required: true, message:'name error'}, { type: 'string', min: 3, message: 'less than 3'}]}>
          <Input/>
        </Item>
        <Item label='Password' name='password' 
          rules={[{type: 'string', required: true, message: 'password error' }, {type: 'string', min: 4, message: 'less then 4' }]}>
          <Input type='password'/>
        </Item>
        <Item label='Confirm' name='confirmPwd' 
          rules={[{type: 'string', required: true, message: 'confirm password error' }, {type: 'string', min: 4, message: 'less then 4' },
                  ({ getFieldValue }) => ({
                    asyncValidator(rule, value) {
                      return new Promise((resolve, reject) => {
                        if (value !== getFieldValue('password')) {
                          reject('Do not match!')
                        }
                        resolve()
                      })
                    }
                  })
                ]}>
          <Input type='password'/>
        </Item>
        <Button type="submit" btnType={ButtonType.Primary}>Log in</Button>
      </Form>
    )
    const { getByDisplayValue, getByText } = screen
    // eslint-disable-next-line testing-library/prefer-screen-queries
    nameInput = getByDisplayValue('viking')
    // eslint-disable-next-line testing-library/prefer-screen-queries
    pwdInput = getByDisplayValue('12345')
    // eslint-disable-next-line testing-library/prefer-screen-queries
    conPwdInput = getByDisplayValue('23456')
    // eslint-disable-next-line testing-library/prefer-screen-queries
    submitButton = getByText('Log in')
  })
  it('Form组件应该正确挂载', () => {
    const { getByText } = screen
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByText('Name')).toBeInTheDocument()
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByText('Password')).toBeInTheDocument()
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByText('Confirm')).toBeInTheDocument()
    expect(nameInput).toBeInTheDocument()
    expect(pwdInput).toBeInTheDocument()
    expect(conPwdInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })
  it('提交不合法的数据应该报错', async () => {
    const { getByText } = screen
    fireEvent.change(nameInput, {target: {value: ''}})
    fireEvent.change(pwdInput, {target: {value: ''}})
    fireEvent.click(submitButton)
    await waitFor(() => {
      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(getByText('name error')).toBeInTheDocument()
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions, testing-library/prefer-screen-queries
      expect(getByText('password error')).toBeInTheDocument()
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(testProps.onFinishFailed).toHaveBeenCalled()
    })
  })
  it('改变输入为不合法时应该弹出提示', async () => {
    const { getByText } = screen
    fireEvent.change(nameInput, {target: {value: ''}})
    fireEvent.blur(nameInput)
    await waitFor(() => {
      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(getByText('name error')).toBeInTheDocument()
    })
    fireEvent.change(nameInput, {target: {value: '12'}})
    fireEvent.blur(nameInput)
    await waitFor(() => {
      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(getByText('less than 3')).toBeInTheDocument()
    })
  })
  it('自定义规则应该生效', async () => {
    const { getByText, queryByRole } = screen
    fireEvent.change(conPwdInput, {target: {value: '23456'}})
    fireEvent.blur(conPwdInput)
    await waitFor(() => {
      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(getByText('Do not match!')).toBeInTheDocument()
    })
    fireEvent.change(conPwdInput, {target: {value: '12345'}})
    fireEvent.blur(conPwdInput)
    await waitFor(() => {
      // eslint-disable-next-line testing-library/prefer-screen-queries, testing-library/prefer-presence-queries
      expect(queryByRole('Do not match!')).not.toBeInTheDocument()
    })
    fireEvent.click(submitButton)
    await waitFor(() => { 
      expect(testProps.onFinish).toHaveBeenCalled()
    })
  })
})