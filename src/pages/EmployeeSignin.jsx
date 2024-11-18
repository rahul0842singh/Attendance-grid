import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import emp from "../images/emp.jpg"
import { useNavigate,useLocation } from 'react-router-dom';

const onFinish = (values) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const EmployeeSignin = () => {
    const navigate = useNavigate();
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };




    const [login, setLogin] = useState({ 
        employee_id: "", 
        password: "" 
    });

    const signHandleChange = (e) => {
        setLogin((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };


    const empsign = async () => {

        try {
            const res = await fetch('https://backend-smoky-three.vercel.app/api/emplogin', {
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
                localStorage.setItem('employee_id', data.employeeProfile.employee_id); // Store employee ID

              
    
                message.success("Sign in successfully");
    
                // Redirect to project page
                const employee_id = data.employeeProfile.employee_id;
                navigate('/timesheet', { state: { employee_id } });
            } else {
                message.error("Invalid email or password"); 
            }
        } catch (error) {
            message.error("An error occurred during sign-in");
        }
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
                            <img src={emp} height="700" width="700"
                                className="img-fluid" alt="Sample image" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form>



                                <Form
                                    name="basic"
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    style={{ maxWidth: '100%' }}
                                    initialValues={{ remember: true }}
                                    // onFinish={empsign}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        label={<label style={{ fontWeight: "bold", color: "grey" }}>Employee Id</label>}
                                        rules={[{ required: true, message: 'Please input your username!' }]}
                                        style={{ marginBottom: '1rem' }}
                                    >
                                        <Input  name="employee_id"   onChange={signHandleChange}  value={login.employee_id} size="large" />
                                    </Form.Item>

                                    <Form.Item
                                        label={<label style={{ fontWeight: "bold", color: "grey" }}>Password</label>}
                                        rules={[{ required: true, message: 'Please input your password!' }]}
                                        style={{ marginBottom: '1rem' }}
                                    >
                                        <Input.Password 
                                         name="password"
                                         value={login.password}
                                         onChange={signHandleChange}
                                        size="large" />
                                    </Form.Item>

                                    <Form.Item
                                        name="remember"
                                        valuePropName="checked"
                                        wrapperCol={{ offset: 0, span: 24 }}
                                        style={{ marginBottom: '1rem' }}
                                    >
                                        <Checkbox>Remember me</Checkbox>
                                    </Form.Item>

                                    <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                                        <Button onClick={empsign}  size="large" style={{ width: '100%', backgroundColor: "#ff4d4f", color: "white" }}>
                                            Submit
                                        </Button>
                                    </Form.Item>

                                </Form>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default EmployeeSignin;
