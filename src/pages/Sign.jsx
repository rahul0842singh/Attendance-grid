import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Form, Input, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import logo from '../images/logo.png';
import axios from 'axios';
import { message } from 'antd';


const Sign = () => {

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

    useEffect(() => {
        if (modalStep === 2 && timer > 0) {
            const countdown = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(countdown);
        } else if (timer === 0) {
            setIsResendDisabled(false);
        }
    }, [modalStep, timer]);


    const handleChange = (event) => { setPhoneNumber(event.target.value); };


    useEffect(() => {
        form.validateFields(['phone_number']).then(
            () => setIsSendOtpDisabled(false),
            () => setIsSendOtpDisabled(true)
        );
    }, [phoneNumber]);

    const handleResendOTP = () => {
        setIsResendDisabled(true);
        setTimer(60);
        console.log('OTP resent');
    };

    const [login, setLogin] = useState({ email: '', password: '' });

    const signHandleChange = (e) => {
        setLogin((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };



    const SignIn = async () => {
        try {
            const res = await fetch(`https://backend-smoky-three.vercel.app/api/login`, {
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
                const companyId = data.companyProfile.company_id;
                navigate('/project', { state: { companyId } });
            } else {
                message.error("Invalid email or password");
            }
        } catch (error) {
            message.error("An error occurred during sign-in");
        }
    };
    

    const sendOtp = async () => {
        try {
            const res = await fetch('http://localhost:9000/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone_number: phoneNumber }),
            });

            const data = await res.json();
            console.log(phoneNumber);

            if (res.ok) {
                console.log("Sent OTP successfully", phoneNumber, data);
            } else {
                console.error("Failed to send OTP:", data.error);
            }
        } catch (error) {
            console.error('Network error or server is unreachable:', error);
        }
    };


    const verifyOtp = async () => {
        try {
            const res = await fetch('http://localhost:9000/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone_number: phoneNumber, otp: otp }),
            });

            const data = await res.json();

            if (res.ok) {
                console.log("OTP verified successfully", data);
                setModalStep(3);
            } else {
                console.error("Failed to verify OTP:", data.error);
                message.error(`Failed to verify OTP: ${data.error}`);
            }
        } catch (error) {
            console.error('Network error or server is unreachable:', error);
            message.error("Network error or server is unreachable.");
        }
    };

    const [pass, setPass] = useState("")

    const handlePassChange = (e) => {
        setPass(e.target.value)
    }



    const SetNewPassword = async () => {
        try {
            const res = await fetch(`http://localhost:9000/update-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone: phoneNumber, password: pass }),  // Use 'phone' and 'password' as keys
            });

            const data = await res.json();
            console.log(phoneNumber, pass);
            console.log(res.ok);

            if (res.ok) {
                console.log("Password updated successfully", data);
                message.success("Password changed successfully");
            } else {
                console.error("Failed to update password:", data.error);
                message.error(`Failed to update password: ${data.error}`);
            }
        } catch (error) {
            console.error('Network error or server is unreachable:', error);
            message.error("Network error or server is unreachable.");
        }
    };



    const onFinish = (values) => {
        console.log('Login values:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const showForgotPasswordModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setModalStep(1);
        setTimer(60);
        setIsResendDisabled(true);
        form.resetFields();
    };

    const validatePhoneNumber = (_, value) => {
        const phoneNumberPattern = /^\+\d{2}\d{10}$/;
        if (!value) {
            return Promise.reject(new Error('Please input your registered Phone!'));
        } else if (!phoneNumberPattern.test(value)) {
            return Promise.reject(new Error('Phone number must be in the format +[2-digit Country Code][10 digits].'));
        } else {
            return Promise.resolve();
        }
    };

    return (
        <>
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid" alt="Sample image" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <div className="text-center mb-4">
                                <img src={logo} alt="Logo" className="logo" />
                                <h3 className='mb-4'>We are The Grid Team</h3>
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
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your username!',
                                        },
                                    ]}
                                    style={{ marginBottom: '1rem' }}
                                >
                                    <Input size="large" name="email" value={login.email} onChange={signHandleChange} />
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

                                <div className="d-flex justify-content-between">
                                    <a onClick={() => { showForgotPasswordModal() }} className="text-body forgot-link">Forgot password?</a>
                                    <a href="/register" className="text-body register-link">Register?</a>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </section>

            <Modal
                title="Forgot Password"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                {modalStep === 1 && (
                    <Form form={form} layout="vertical">
                        <Form.Item
                            label="Phone"
                            name="phone_number"
                            value={phoneNumber}
                            onChange={handleChange}
                            rules={[
                                {
                                    validator: validatePhoneNumber,
                                    required: true,
                                },
                            ]}
                        >
                            <Input required onChange={(e) => setPhoneNumber(e.target.value)} />
                        </Form.Item>
                        <Button
                            type="primary"
                            onClick={() => { setModalStep(2); sendOtp(); }}
                            disabled={isSendOtpDisabled}
                        >
                            Send OTP
                        </Button>
                    </Form>
                )}
                {modalStep === 2 && (
                    <Form layout="vertical">
                        <Form.Item
                            label="OTP"
                            name="otp"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please verify your OTP!',
                                },
                            ]}
                            style={{ marginBottom: '8px' }}
                        >
                            <Input onChange={(e) => setOtp(e.target.value)} />
                        </Form.Item>
                        <div className='ms-5' style={{ color: 'gray', marginTop: '8px', fontSize: "12px" }}>
                            {isResendDisabled ? (
                                <>Resend OTP in <span className='text-danger fw-bold'>{timer} </span> seconds</>
                            ) : (
                                <a style={{ textDecoration: "underline", }} onClick={handleResendOTP} className="resend-link text-primary">
                                    Resend OTP
                                </a>
                            )}
                        </div>
                        <Button
                            type='primary'
                            style={{ backgroundColor: "green", color: "white", marginTop: '16px' }}
                            onClick={verifyOtp}  // Call verifyOtp to handle the OTP verification
                            disabled={otp.length === 0}
                        >
                            Verify OTP
                        </Button>
                    </Form>
                )}

                {modalStep === 3 && (
                    <Form layout="vertical">
                        <Form.Item
                            label="New Password"
                            name="newPassword"
                            value={pass.password}
                            onChange={handlePassChange}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your new password!',
                                },
                            ]}
                        >
                            <Input.Password onChange={(e) => setNewPassword(e.target.value)} />
                        </Form.Item>
                        <Button type="primary" onClick={() => { handleCancel(); SetNewPassword() }}>
                            Submit
                        </Button>
                    </Form>
                )}
            </Modal>
        </>
    );
};

export default Sign;
