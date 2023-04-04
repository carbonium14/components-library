import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Alert from './components/Alert/alert';
function App() {
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
  </>
}

export default App;
