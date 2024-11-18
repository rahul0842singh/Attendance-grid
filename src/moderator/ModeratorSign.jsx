import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Form, Input, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import logo from '../images/logo.png';
import axios from 'axios';
import amdin from "../images/admin.png"
import { message } from 'antd';


const ModeratorSign = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalStep, setModalStep] = useState(1);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [timer, setTimer] = useState(60);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [isSendOtpDisabled, setIsSendOtpDisabled] = useState(true);

 

  
    const [login, setLogin] = useState({ username: '', password: '' });

    const signHandleChange = (e) => {
        setLogin((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };


  


    const SignIn = async () => {
        try {
            const res = await fetch('https://backend-smoky-three.vercel.app/api/loginadmin', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login)
            });
    
            const data = await res.json();
    
            if (res.ok) {
                // Save the JWT token in localStorage
                localStorage.setItem('token', data.token);
    
                message.success("Sign in successfully");
    
                // Redirect to project page
             
                navigate('/admindash');
            } else {
                message.error("Invalid email or password");
            }
        } catch (error) {
            message.error("An error occurred during sign-in");
        }
    };
    



    const onFinish = (values) => {
        console.log('Login values:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <>
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src={amdin} height="500" width="500"  className="img-fluid" alt="Sample image" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <div className="text-center mb-4">
                          
                                <h3 className='mb-4'>Admin</h3>
                                <br />
                            </div>
                            <Form
                                form={form}
                                name="basic"
                                labelCol={{
                                    span: 24,
                                }}
                                wrapperCol={{
                                    span: 24,
                                }}
                                style={{
                                    maxWidth: '100%',
                                    marginTop: "5px"
                                }}
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label={<label style={{ fontWeight: "bold", color: "grey" }}>Username</label>}
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your username!',
                                        },
                                    ]}
                                    style={{ marginBottom: '1rem' }}
                                >
                                    <Input size="large" name="username" value={login.username} onChange={signHandleChange} />
                                </Form.Item>

                                <Form.Item
                                    label={<label style={{ fontWeight: "bold", color: "grey" }}>Password</label>}
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                    style={{ marginBottom: '1rem' }}
                                >
                                    <Input.Password size="large" name="password" value={login.password} onChange={signHandleChange} />
                                </Form.Item>


                                <Form.Item
                                    name="remember"
                                    valuePropName="checked"
                                    wrapperCol={{
                                        offset: 0,
                                        span: 24,
                                    }}
                                    style={{ marginBottom: '1rem' }}
                                >
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                <Form.Item
                                    wrapperCol={{
                                        offset: 0,
                                        span: 24,
                                    }}
                                >
                                    <Button onClick={SignIn} htmlType="submit" size="large" className="submit-button">
                                        Log In
                                    </Button>
                                </Form.Item>

                                
                            </Form>
                        </div>
                    </div>
                </div>
            </section>

       
        </>
    );
};

export default ModeratorSign;
