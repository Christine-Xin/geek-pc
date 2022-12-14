import { Card , Button, Checkbox, Form , Input, message} from 'antd';
import logo from '@/assets/logo.png'
import './index.scss'
import {useStore} from '@/store'
import {useNavigate} from 'react-router-dom'
function Login (){
    const {loginStore}= useStore()
    const navigate= useNavigate()
    const onFinish=async (values)=>{
        console.log(values)
        await loginStore.getToken({
            mobile:values.mobile,
            code:values.code
        })
        navigate('/')
        message.success('登录成功！')
    }
    return (
        <div className='login'>
           <Card className='login-container'>
                <img className='login-logo' src={logo} alt=""/>
                <Form 
                    initialValues={{
                        remember: true,
                    }}
                    validateTrigger={['onBlur','onChange']}
                    onFinish={onFinish}
                >
                    <Form.Item label="手机号"
                        name="mobile"
                        rules={[
                          {
                            required: true,
                            message: '请输入手机号',
                          },
                          {
                            pattern: /^1[3-9]\d{9}$/,
                            message: '请输入正确的手机号',
                            validateTrigger: 'onBlur'
                          }
                        ]}
                    >
                        <Input placeholder='请输入手机号'></Input>
                    </Form.Item>
                    <Form.Item label="验证码"
                        name="code"
                        rules={[
                          {
                            required: true,
                            message: '请输入密码',
                          },
                          {
                            len: 6,
                            message: '请输入6位密码',
                            validateTrigger: 'onBlur'
                          }
                        ]}
                    >
                        <Input placeholder='请输入验证码'></Input>
                    </Form.Item>
                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox className='login-checkbox-label'>我已阅读</Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">登录</Button>
                    </Form.Item>
                </Form>
           </Card>
        </div>
    )
}

export default Login;