import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined, MailOutlined, FormOutlined } from '@ant-design/icons';
import { QuestionCircleOutlined, PlusOutlined, HomeOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Steps, theme, DatePicker, Tooltip, Upload, Breadcrumb } from 'antd';
import Navbar from '../component/Navbar';

const colors = ['volcano'];
const { Step } = Steps;
const tooltipText = "Enter the Total number of employees in your company";

const Register = () => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [current, setCurrent] = useState(0);
    const [formValues, setFormValues] = useState({});
    const { token } = theme.useToken();
    const navigate = useNavigate();

    const handleFileChange = ({ fileList }) => {
        setFileList(fileList);
    };

  const handleSubmit = async () => {
    try {
        const values = await form.validateFields();
        const finalValues = { ...formValues, ...values };

        const formData = new FormData();
        formData.append('company_name', finalValues.company_name);
        formData.append('owners_count', finalValues.owners_count);
        formData.append('total_member', finalValues.total_member);
        formData.append('phone', finalValues.phone);
        formData.append('establishment_date', finalValues.establishment_date.format('YYYY-MM-DD'));
        formData.append('email', finalValues.email);
        formData.append('password', finalValues.password);

        if (fileList.length > 0) {
            formData.append('logo', fileList[0].originFileObj);
        } else {
            message.error('Please upload a file');
            return;
        }

        try {
            const response = await axios.post('http://localhost:9000/registerCompany', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            message.success(response.data.message || 'Registration successful');
            navigate('/sign');
        } catch (error) {
            // Display error message from server
            message.error(error.response?.data?.message || 'Registration failed');
        }
    } catch (error) {
        console.log('Validation failed:', error);
    }
};

    const next = async () => {
        try {
            const values = await form.validateFields();
            setFormValues({ ...formValues, ...values });
            setCurrent(current + 1);
        } catch (error) {
            console.log('Validation failed:', error);
        }
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const steps = [
        {
            title: 'Register',
            icon: <FormOutlined />,
            description: 'Fill Your company details',
            content: (
                <Form form={form} initialValues={formValues} onFinish={handleSubmit}>
                    <Form.Item
                        name="company_name"
                        label={<label style={{ fontWeight: "bolder" }}>Company</label>}
                        rules={[{ required: true, message: 'Please input your company name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="owners_count"
                        label={<label style={{ fontWeight: "bolder" }}>No of Owner</label>}
                        rules={[{ required: true, message: 'Please input the number of owners!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="total_member"
                        label={
                            <span>
                                <label style={{ fontWeight: "bolder" }}>Member</label>
                                {colors.map((color) => (
                                    <Tooltip title={tooltipText} color={color} key={color}>
                                        <QuestionCircleOutlined style={{ marginLeft: 8 }} />
                                    </Tooltip>
                                ))}
                            </span>
                        }
                        rules={[{ required: true, message: 'Please input the total number of members!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label={<label style={{ fontWeight: "bolder" }}>Phone</label>}
                        rules={[
                            { required: true, message: 'Please input Phone!' },
                            {
                                pattern: /^\+\d{2}\d{10}$/,
                                message: 'Phone number must be in the format +91XXXXXXXXXX with exactly 12 digits',
                            },
                        ]}
                    >
                        <Input maxLength={13} placeholder="+91XXXXXXXXXX" />
                    </Form.Item>


                    <Form.Item
                        name="logo"
                        label={<label style={{ fontWeight: "bolder" }}>Upload Logo</label>}
                        rules={[{ required: true, message: 'Please upload your company logo!' }]}
                    >
                        <Upload
                            listType="picture-card"
                            beforeUpload={() => false}
                            onChange={handleFileChange}
                            fileList={fileList}
                        >
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        name="establishment_date"
                        label={<label style={{ fontWeight: "bolder" }}>Company Date</label>}
                        rules={[{ required: true, message: 'Please select the establishment date!' }]}
                    >
                        <DatePicker />
                    </Form.Item>
                </Form>
            ),
        },
        {
            title: 'Login Username',
            icon: <MailOutlined />,
            description: 'Enter your email',
            content: (
                <Form form={form} initialValues={formValues}>
                    <Form.Item
                        name="email"
                        label={<label style={{ fontWeight: "bolder" }}>Email</label>}
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            ),
        },
        {
            title: 'Password',
            icon: <LockOutlined />,
            description: 'Set your password',
            content: (
                <Form form={form} initialValues={formValues}>
                    <Form.Item
                        name="password"
                        label={<label style={{ fontWeight: "bolder" }}>Password</label>}
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Form>
            ),
        },
    ];

    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
        icon: item.icon,
        description: item.description,
    }));

    const contentStyle = {
        padding: '24px',
        lineHeight: 'normal',
        textAlign: 'center',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };

    return (
        <>
            <Navbar showLinks={false} showLoginButton={true} showRegisterButton={false} />
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 col-lg-6 col-sm-6'>
                        <Breadcrumb
                            items={[
                                {
                                    href: '',
                                    title: <HomeOutlined />,
                                },
                                {
                                    href: '',
                                    title: (
                                        <>
                                            <UserOutlined />
                                            <span>Registration</span>
                                        </>
                                    ),
                                },
                                {
                                    title: 'Company Register',
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>

            <div style={{ width: "45rem" }} className='container mt-5'>
                <div className='row'>
                    <div className='col-sm-12 col-md-12 col-lg-12 p-4'>
                        <Steps current={current} items={items} />
                        <div style={contentStyle}>{steps[current].content}</div>
                        <div style={{ marginTop: 24 }}>
                            {current < steps.length - 1 && (
                                <Button type="primary" onClick={next}>
                                    Next
                                </Button>
                            )}
                            {current === steps.length - 1 && (
                                <Button type="primary" onClick={handleSubmit} htmlType="submit">
                                    Done
                                </Button>
                            )}
                            {current > 0 && (
                                <Button style={{ margin: '0 8px' }} onClick={prev}>
                                    Previous
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
