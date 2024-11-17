import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Alert, Typography, Select, message } from 'antd';
import { useLocation,Navigate, useNavigate } from 'react-router-dom';
import logo from "../../src/images/logo.png";
import axios from 'axios';
import "../App.css";
import hdfc from "../images/hdfc.png";
import sbi from "../images/sbi.png";
import icici from "../images/icici.png";
import upi from "../images/upi.png";
import EmpFooter from '../component/EmpFooter';
import bill from "../images/billdesk-logo.png";

const { Text } = Typography;
const { Option } = Select;

const layout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailLayout = {
    wrapperCol: {
        xs: { span: 24 },
        sm: { offset: 8, span: 16 },
    },
};

const Checkout = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const { pricing_plan = 'Demo Plan', amount = '100.00' } = location.state || {};
    const [selectedPaymentOption, setSelectedPaymentOption] = useState('Internet Banking');
    const [form] = Form.useForm();
    const [receipt, setReceipt] = useState('');

    // Generate unique receipt number
    useEffect(() => {
        const generateReceipt = () => {
            const receiptNo = `REC-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
            setReceipt(receiptNo);
        };
        generateReceipt();
    }, []);
    useEffect(() => {
        console.log("Received data from previous page:", location.state);
    }, [location]);
    
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        try {
            const res = await loadRazorpayScript();
            
            if (!res) {
                alert('Failed to load Razorpay SDK');
                return;
            }
        
            // Get form values
            const values = form.getFieldsValue();
            console.log("log the mobile", values.mobile , values.email, values.payment_method);
        
            // Prepare data to send to backend (include form and predefined values)
            const paymentData = {
                pricing_plan,
                amount,
                receipt,
                currency: 'INR',
                mobile: values.mobile,
                email: values.email,
                payment_method: selectedPaymentOption,  // Add payment method here
            };
        
            console.log('Payment Data:', paymentData); // Check all data before sending
        
            // Create order on the server
            const orderResponse = await axios.post('http://localhost:3000/create-order', {
                amount: paymentData.amount, // Send the amount from form
                currency: paymentData.currency,
                receipt: paymentData.receipt, 
                payment_method: paymentData.payment_method, 
                mobile : paymentData.mobile,
                email : paymentData.email,
                pricing_plan : paymentData.pricing_plan
            });
    
            // Extract data from the order response
            const { amount: orderAmount, id: order_id, currency } = orderResponse.data;
    
            const options = {
                key: 'rzp_test_o4CCSfsu759r6s', // Razorpay key ID from your dashboard
                amount: orderAmount,
                currency,
                name: 'Your Company Name',
                description: 'Test Transaction',
                image: 'https://your-logo-url.com/logo.png', // Optional logo URL
                order_id,
                handler: async (response) => {
                    try {
                        const paymentResponseData = {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        };
    
                        // Send payment details for verification
                        const verificationResponse = await axios.post(
                            'http://localhost:3000/verify-payment',
                            paymentResponseData
                        );
                        
                        console.log("paymentResponseData", paymentResponseData);
                        
                        if (verificationResponse.data.status === 'success') {
                            message.success("Payment Successful");
                            navigate("/result");
                        } else {
                            alert('Payment verification failed');
                        }
                    } catch (verificationError) {
                        console.error('Error during payment verification:', verificationError);
                        alert('An error occurred during payment verification. Please try again.');
                    }
                },
                prefill: {
                    name: values.name,
                    email: values.email,
                    contact: values.mobile,
                },
                theme: {
                    color: '#F37254',
                },
            };
        
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Payment error:', error);
            message.warning("Payment already done by this mobile or email")
        }
    };
    


    const onFinish = (values) => {
        form.setFieldsValue({ payment_method: selectedPaymentOption });
        console.log('Form Values:', { ...values, payment_method: selectedPaymentOption });
        handlePayment();
    };

    const renderPaymentContent = () => {
        switch (selectedPaymentOption) {
            case 'Internet Banking':
                return (
                    <div className="bank-options">
                        <img src={hdfc} alt="HDFC" className="bank-image" />
                        <img src={icici} alt="ICICI" className="bank-image" />
                        <img src={sbi} alt="SBI" className="bank-image sbi-image" />
                    </div>
                );
            case 'Debit Card':
                return (
                    <Select placeholder="Select Bank" style={{ width: '100%' }}>
                        <Option value="hdfc">HDFC</Option>
                        <Option value="icici">ICICI</Option>
                        <Option value="sbi">SBI</Option>
                    </Select>
                );
            case 'UPI':
                return (
                    <img src={upi} alt="UPI" style={{ width: 150, height: 50 }} />
                );
            default:
                return null;
        }
    };

    return (
        <>
            <div className='container main-container-pay shadow rounded mt-5'>
                <div className='container-fluid'>
                    <img className='mt-3' height="60" width="150" src={logo} alt="logo" />
                </div>

                <Alert showIcon={false} className='mt-4 full-width-alert p-4' message="Dear SBI Credit Cardholder, your payment will be credited instantly. In case of any issues with bank settlement or network failure, we request you to wait for 24 to 48 hours to get the credit" banner />

                <div className='col-sm-12 col-md-12 col-lg-12 p-4'>
                    <Form
                        {...layout}
                        className='mt-5'
                        form={form}
                        name="control-hooks"
                        onFinish={onFinish}
                        initialValues={{
                            pricing_plan: pricing_plan, 
                            amount: amount,              
                            receipt: receipt,         
                            currency: 'INR',  
                             
                        }}
                        style={{
                            maxWidth: 600,
                            margin: "0",
                            textAlign: "left"
                        }}
                        
                    >
                        <Form.Item
                            name="pricing_plan"
                            label="Pricing plan"
                        >
                            <Text style={{ fontWeight: "bold" }}>{pricing_plan }</Text>
                        </Form.Item>

                        <Form.Item
                            name="mobile"
                            label="Mobile Number"
                            rules={[
                                { required: true, message: 'Please input Phone!' },
                                {
                                    pattern: /^\+\d{2}\d{10}$/,
                                    message: 'Phone number must be in the format +91XXXXXXXXXX with exactly 12 digits',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="Email id"
                            rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="amount"
                            label="Amount to be paid"
                        >
                            <Text style={{ fontWeight: "bold" }}>{amount}</Text>
                        </Form.Item>

                        <Form.Item
                            name="receipt"
                            label="Receipt No."
                        >
                            <Text style={{ fontWeight: "bold" }}>{receipt}</Text>
                        </Form.Item>

                        <Form.Item
                            name="currency"
                            label="Currency"
                        >
                            <Text style={{ fontWeight: "bold" }}>INR</Text>
                        </Form.Item>

                        <Form.Item
                            name="payment_method"
                            label="Payment option"
                           
                        >
                            <ul className="nav nav-pills border p-2 rounded bg-light justify-content-between" role="tablist">
                                <li className="nav-item p-1" role="presentation">
                                    <button
                                        className={`nav-link large-tab p-3 ${selectedPaymentOption === 'Internet Banking' ? 'active' : ''}`}
                                        id="pills-home-tab"
                                        type="button"
                                        role="tab"
                                        onClick={() => setSelectedPaymentOption('Internet Banking')}
                                    >
                                        Internet Banking
                                    </button>
                                </li>
                                <li className="nav-item p-1" role="presentation">
                                    <button
                                        className={`nav-link large-tab p-3 ${selectedPaymentOption === 'Debit Card' ? 'active' : ''}`}
                                        id="pills-profile-tab"
                                        type="button"
                                        role="tab"
                                        onClick={() => setSelectedPaymentOption('Debit Card')}
                                    >
                                        Debit Card
                                    </button>
                                </li>
                                <li className="nav-item p-1" role="presentation">
                                    <button
                                        className={`nav-link large-tab p-3 ${selectedPaymentOption === 'UPI' ? 'active' : ''}`}
                                        id="pills-contact-tab"
                                        type="button"
                                        role="tab"
                                        onClick={() => setSelectedPaymentOption('UPI')}
                                    >
                                        UPI
                                    </button>
                                </li>
                            </ul>
                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" role="tabpanel">
                                    {renderPaymentContent()}
                                </div>
                            </div>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button className='mt-4' type="primary" htmlType="submit" block>
                                Pay Now
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>

            <div className='container rounded border p-2'>
                <div className='row'>
                    <div className='col-sm-10 col-md-10 col-lg-10'>
                        <span style={{ fontSize: "13px" }} className='w-100'>
                            Your transaction is processed through a secure 128-bit https internet connection based on secure socket layer technology. For security purposes, Your IP address <span className='text-danger p-2 w-100'>2409:40e3:402b:9645:b48d:788d:38b0:e071</span> and access time <span className='text-danger p-2 w-100'>Jul 08 20:26:19 IST 2024</span> have been logged.
                        </span>
                    </div>

                    <div className='col-sm-2 col-md-2 col-lg-2'>
                        <img height="50" width="120" src={bill} alt="billdesk-logo"></img>
                    </div>
                </div>
            </div>

            <EmpFooter />
        </>
    );
};

export default Checkout;
