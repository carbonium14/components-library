import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Alert from './components/Alert/alert';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Tab from './components/Tabs/tab';
import TabItem from './components/Tabs/tabItem';
import Icon from './components/Icon/icon';
import Input from './components/Input/input';
import AutoComplete, { DataSourceType } from './components/AutoComplete/autoComplete';
import Select from './components/Select/select';
import Option from './components/Select/option';
import Upload from './components/Upload/upload';
import Form, { IFormRef } from './components/Form/form';
import FormItem from './components/Form/formItem';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { CustomRule } from './components/Form/useStore';
import { useRef } from 'react';
library.add(fas)
interface LakerPlayerProps {
  value: string;
  number: number;
}
interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}
function App() {
  const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins', 'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando']
  const handleFetch = (query: string) => {
    return lakers.filter(name => name.includes(query)).map(name => ({value: name}))
  }
  const lakersWithNumber = [
    {value: 'bradley', number: 11},
    {value: 'pope', number: 1},
    {value: 'caruso', number: 4},
    {value: 'cook', number: 2},
    {value: 'cousins', number: 15},
    {value: 'james', number: 23},
    {value: 'AD', number: 3},
    {value: 'green', number: 14},
    {value: 'howard', number: 39},
    {value: 'kuzma', number: 0},
  ] 
  const handleFetch2 = (query: string) => {
    return lakersWithNumber.filter(player => player.value.includes(query))
  }
  const renderOption2 = (item: DataSourceType) => {
    const itemWithNumber = item as DataSourceType<LakerPlayerProps>
    return (
      <>
        <b>名字: {itemWithNumber.value}</b>&nbsp;
        <span>球衣号码: {itemWithNumber.number}</span>
      </>
    )
  }
  const handleFetch3 = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => {
        return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))
      })
  }
  const renderOption3 = (item: DataSourceType) => {
    const itemWithGithub = item as DataSourceType<GithubUserProps>
    return (
      <>
        <b>Name: {itemWithGithub.value}</b>&nbsp;
        <span>url: {itemWithGithub.url}</span>
      </>
    )
  }
  const checkFileSize = (file: File) => {
    if (Math.round(file.size / 1024) > 50) {
      alert('file too big')
      return false;
    }
    return true;
  }
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
  const initialValues = {
    agreement: false
  }
  const ref = useRef<IFormRef>(null)
  const resetAll = () => {
    ref.current?.resetFields()
  }
  return <>
    <Button>hello</Button>
    <Button disabled>hello</Button>
    <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>hello</Button>
    <Button btnType={ButtonType.Primary} size={ButtonSize.Small}>hello</Button>
    <Button btnType={ButtonType.Default} size={ButtonSize.Large}>hello</Button>
    <Button btnType={ButtonType.Default} size={ButtonSize.Small}>hello</Button>
    <Button btnType={ButtonType.Danger} size={ButtonSize.Large}>hello</Button>
    <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>hello</Button>
    <Button btnType={ButtonType.Link} href='https://www.baidu.com'>baidu</Button>
    <Button btnType={ButtonType.Link} href='https://www.baidu.com' disabled>baidu</Button>
    <div style={{margin: '10px auto', width: '700px'}}>
      <Alert title='标题' closable={false}  type='success' description='描述'></Alert>
      <Alert title='标题' closable onClose={() => {}} type='danger' description='描述'></Alert>
      <Alert title='标题' type='default' description='描述'></Alert>
      <Alert title='标题' type='warning' description='描述'></Alert>
    </div>
    <Menu defaultIndex={'0'} onSelect={(index) => {console.log(index)}}>
      <MenuItem>
        普通的菜单
      </MenuItem>
      <MenuItem disabled>
        屏蔽的菜单
      </MenuItem>
      <SubMenu title='dropdown'>
        <MenuItem>
          下拉菜单
        </MenuItem>
        <MenuItem>
          单击即可出现
        </MenuItem>
      </SubMenu>
      <MenuItem>
        <a href='https://www.baidu.com'>baidu</a>
      </MenuItem>
    </Menu>
    <Menu defaultIndex={'0'} onSelect={(index) => {console.log(index)}} mode='vertical' defaultOpenSubMenus={['2']}>
      <MenuItem>
        普通的菜单
      </MenuItem>
      <MenuItem disabled>
        屏蔽的菜单
      </MenuItem>
      <SubMenu title='自动打开的submenu'>
        <MenuItem>
          下拉菜单
        </MenuItem>
        <MenuItem>
          可以自动出现
        </MenuItem>
      </SubMenu>
      <SubMenu title='不会自动打开的submenu'>
        <MenuItem>
          下拉菜单
        </MenuItem>
        <MenuItem>
          单击即可出现
        </MenuItem>
      </SubMenu>
      <MenuItem>
        <a href='https://www.baidu.com'>baidu</a>
      </MenuItem>
    </Menu>
    <Tab defaultIndex={0} onSelect={(index) => console.log(index)}>
      <TabItem label={'label1'}>label1</TabItem>
      <TabItem label={<span style={{color: 'red'}}>span标签</span>}>span</TabItem>
      <TabItem label={'disabled'} disabled>disabled</TabItem>
    </Tab>
    <Tab defaultIndex={0} onSelect={(index) => console.log(index)} type='card'>
      <TabItem label={'label1'}>label1</TabItem>
      <TabItem label={<span style={{color: 'red'}}>span标签</span>}>span</TabItem>
      <TabItem label={'disabled'} disabled>disabled</TabItem>
    </Tab>
    <Icon icon="coffee" theme='danger' size='10x'></Icon>
    <Icon icon="coffee" theme='primary' size='10x'></Icon>
    <Input size='lg' placeholder='请输入你想要的内容'></Input>
    <Input size='sm'></Input>
    <Input disabled></Input>
    <Input prepend={'https://'}></Input>
    <Input append={'.com'}></Input>
    <Input onChange={(e) => console.log(e.target.value)}></Input>
    <AutoComplete fetchSuggestions={handleFetch} placeholder="输入湖人队球员英文名试试"/>
    <AutoComplete fetchSuggestions={handleFetch2} placeholder="输入湖人队球员英文,自定义下拉模版" renderOptions={renderOption2}/>
    <AutoComplete fetchSuggestions={handleFetch3} placeholder="输入 Github 用户名试试" renderOptions={renderOption3}/>
    <Select placeholder="请选择"
      onChange={(selectedValue, selectedValues) => console.log('selectedValue ' + selectedValue, 'selectedValues ' + selectedValues)}
      onVisibleChange={(visible) => console.log('visible ' + visible)}>
      <Option value="nihao" />
      <Option value="nihao2" />
      <Option value="nihao3" />
      <Option value="disabled" disabled/>
      <Option value="nihao5" />
      <Option value="nihao6" label="nihao66"/>
    </Select>
    <Select placeholder="支持多选" multiple
      onChange={(selectedValue, selectedValues) => console.log('selectedValue ' + selectedValue, 'selectedValues ' + selectedValues)}
      onVisibleChange={(visible) => console.log('visible ' + visible)}>
      <Option value="nihao" />
      <Option value="nihao2" />
      <Option value="nihao3" disabled/>
      <Option value="viking" />
      <Option value="viking2" />
      <Option value="nihao6" label="nihao66"/>
    </Select>
    <Select placeholder="禁用" disabled
      onChange={(selectedValue, selectedValues) => console.log('selectedValue ' + selectedValue, 'selectedValues ' + selectedValues)}
      onVisibleChange={(visible) => console.log('visible ' + visible)}>
      <Option value="nihao" />
      <Option value="nihao2" disabled/>
      <Option value="nihao3" />
      <Option value="nihao6" label="nihao66"/>
    </Select>
    <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" 
      onProgress={(p, f) => console.log(p, f)} onSuccess={(d, f) => console.log(d, f)}
      onError={(e, f) => console.log(e, f)} onChange={(f) => console.log(f)} onRemove={(f) => console.log(f)}>
      <Button size={ButtonSize.Large} btnType={ButtonType.Primary}><Icon icon="upload" /> 点击上传 </Button>
    </Upload>
    <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" beforeUpload={checkFileSize}>
      <Button size={ButtonSize.Large} btnType={ButtonType.Primary}><Icon icon="upload" /> 不能传大于50Kb! </Button>
    </Upload>
    <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" name="fileName" multiple drag>
      <Icon icon="upload" size="5x" theme="secondary" />
      <br/>
      <p>点击或者拖动到此区域进行上传</p>
    </Upload>
    <Form>
      <FormItem label='用户名' name='name' rules={[{type: 'string',required: true, min: 3}]}>
        <Input/>
      </FormItem>
      <FormItem label='密码' name='password' rules={[{type: 'string',required: true, min: 3, max: 8 }]}>
        <Input type="password"/>
      </FormItem>
      <FormItem label='确认密码' name='confirmPassword' rules={confirmRules}>
        <Input type="password"/>
      </FormItem>
      <div className='form-submit-area'>
        <Button type="submit" btnType={ButtonType.Primary}>登陆</Button>
      </div>
    </Form>
    <Form initialValues={initialValues}>
      <FormItem label='邮件' name='email' rules={[{ type: 'email',required: true }]}>
        <Input/>
      </FormItem>
      <FormItem label='密码' name='password' rules={[{type: 'string',required: true, min: 3, max: 8 }]}>
        <Input type="password"/>
      </FormItem>
      <FormItem  label='性别'  name='gender' rules={[{type: 'string',required: true }]} getValueFromEvent={(e) => e } valuePropName='defaultValue'>
        <Select placeholder="请选择性别">
          <Option value="男" />
          <Option value="女" />
        </Select>
      </FormItem>
      <div className='agreement-section' style={{ 'display': 'flex', 'justifyContent': 'center'}}>
        <FormItem name='agreement'  rules={[{ type: 'enum', enum: [true], message: '请同意协议'}]} getValueFromEvent={(e) => e.target.checked } valuePropName='checked'>
          <input type="checkbox"/>
        </FormItem>
        <span className="agree-text">注册即代表你同意<a href='https://www.baidu.com'>用户协议</a></span>
      </div>
      <div className='form-submit-area'>
        <Button type="submit" btnType={ButtonType.Primary}>登陆</Button>
      </div>
    </Form>
    <Form initialValues={{ username: 'test', agreement: false }} ref={ref}>
      {({ isValid, isSubmitting }) => (<>
        <FormItem label='邮件' name='email' rules={[{ type: 'email',required: true }]}>
          <Input/>
        </FormItem>
        <FormItem label='密码' name='password' rules={[{type: 'string',required: true, min: 3, max: 8 }]}>
          <Input type="password"/>
        </FormItem>
        <FormItem  label='性别'  name='gender' rules={[{type: 'string',required: true }]} getValueFromEvent={(e) => e } valuePropName='defaultValue'>
          <Select placeholder="请选择性别">
            <Option value="男" />
            <Option value="女" />
          </Select>
        </FormItem>
        <div className='agreement-section' style={{ 'display': 'flex', 'justifyContent': 'center'}}>
          <FormItem name='agreement'  rules={[{ type: 'enum', enum: [true], message: '请同意协议'}]} getValueFromEvent={(e) => e.target.checked } valuePropName='checked'>
            <input type="checkbox"/>
          </FormItem>
          <span className="agree-text">注册即代表你同意<a href='https://www.baidu.com'>用户协议</a></span>
        </div>
        <div className='form-submit-area'>
          <Button type="submit" btnType={ButtonType.Primary}>登陆{isSubmitting ? '验证中' : '验证完毕'} {isValid ? '通过😄' : '没通过😢'}</Button>
          <Button type="button" onClick={resetAll}>重置</Button>
        </div>
      </>)}
    </Form>
  </>
}

export default App;
