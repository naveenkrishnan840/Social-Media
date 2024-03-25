import React, { useState } from 'react';
import { Card, Col, Row, Form, Input, Button, message} from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {register} from "../actions/actions";
import {useHistory} from "react-router-dom";

export const Register = ({register}) => {
    const [form] = Form.useForm();
    const history = useHistory();
    const [register_user, setRegisterUser] = useState({user_name: "", email:"", password:""});
    const onFinish = () =>{
        register({payload:register_user, navigate:history})
    }      
    const onFinishFailed = (values)=> {
        message.error("Submission Failed")
    }
    return (
        <>
            <Row gutter={16}>
                <Col span={7}>
                </Col>
                <Col span={10} style={{marginTop:'150px'}}>
                <Card title="Sign Up" style={{textAlign: "center"}}>
                    <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <Form.Item name="user_name" validateStatus='success'
                            label="User-Name"
                            onChange={(e)=>{
                                setRegisterUser({
                                    ...register_user, user_name: e.target.value
                                })
                            }}
                            rules={[
                            {
                                type: 'text',
                                message: 'The input is not valid User-Name!',
                            },
                            {
                                required: true,
                                message: 'Please input your User-Name!',
                            },
                            ]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="email" validateStatus='success'
                            label="E-mail"
                            onChange={(e)=>{
                                setRegisterUser({
                                    ...register_user, email: e.target.value
                                })
                            }}
                            rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                            ]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="password"
                            label="Password"
                            rules={[
                            {
                                type: 'Password',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your Password',
                            },
                            ]}>
                            <Input.Password/>
                        </Form.Item>
                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            onChange={(e)=>{
                                setRegisterUser({
                                    ...register_user, password: e.target.value
                                })
                            }}
                            rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <div style={{display: 'flex',justifyContent: 'space-around'}}>
                        <Button type='primary' htmlType='submit' >Submit</Button> <Button type='dashed' > <Link to="/signin" >Already You Have Account</Link></Button>
                        </div>
                        
                    </Form>
                </Card>
                </Col>
                <Col span={6}>
                </Col>
            </Row>
        </>
)
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {register}

export default connect(mapStateToProps, mapDispatchToProps)(Register);