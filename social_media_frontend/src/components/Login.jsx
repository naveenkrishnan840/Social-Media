import { Button, Card, Form, Input, Space } from 'antd';
import React, {useState} from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom';
import {SignIn} from "../actions/actions";




export const Login = ({SignIn}) => {
  const [login_user, setLoginUser] = useState({email:"", password:""});
  const {form} = Form.useForm();
  const history = useHistory();
  const onFinish = () => {
    SignIn({payload:login_user, navigate:history})
  };

  return (
    <>
      <Space direction='horizontal' style={{width: '100%', justifyContent: 'center'}}>
      <Card title={"Login"} style={{textAlign:'center', marginTop:150, background:"floralwhite"}}>
        <Form name="basic" form={form}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
      <Form.Item
        label="E-mail"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
        onChange = {(e)=>{
          setLoginUser({...login_user, email:e.target.value})
        }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        onChange = {(e)=>{
          setLoginUser({...login_user, password:e.target.value})
        }}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          SignIn
        </Button>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
      <Link to="/signup" >
      <Button type="dashed">
          SignUp
        </Button>
      </Link>
      </Form.Item>
        </Form>
      </Card>     
      </Space>
    </>
  )
}

const mapStateToProps = (state) => ({
  user: state.user_id
})

const mapDispatchToProps = {SignIn}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
