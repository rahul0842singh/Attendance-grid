import React, { useState,useEffect } from 'react';
import { Row, Breadcrumb, message, Col, Calendar, theme, DatePicker, Button, Badge, Tag, List, TimePicker, Form, Input, Descriptions, Modal, Select } from 'antd';
import { HomeOutlined, UserOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import EmpFooter from '../component/EmpFooter';
import "../App.css";
dayjs.extend(customParseFormat);



const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
};

const onChange = (time, timeString) => {
    console.log(time, timeString);
};

const { RangePicker } = DatePicker;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

const Timesheet = () => {
    const location = useLocation()
    const { employee_id } = location.state || {}
    
    
    const [employeeId, setEmployeeId] = useState('');
    useEffect(() => {
        const storedEmployeeId = localStorage.getItem('employee_id');
        if (storedEmployeeId) {
            setEmployeeId(storedEmployeeId);
        }
    }, []);
   

    const currentDate = dayjs().format('Do MMMM, YYYY');

    const dateFullCellRenderone = (date) => {
        const formattedDate = date.format('YYYY-MM-DD');
        const isNoShow = noShowDates.includes(formattedDate);
        const hasData = dataDates.includes(formattedDate);
        const isWeekend = date.day() === 6 || date.day() === 0;
        const isAfterToday = date.isAfter(dayjs(), 'day');

        let backgroundColor = '';

        if (isNoShow) backgroundColor = '#ff4d4f'; // Red for no show
        else if (hasData) backgroundColor = '#52c41a'; // Green for data available
        else if (isWeekend) backgroundColor = '#ffc9f9'; // Pink for weekends
        else if (isAfterToday) backgroundColor = '#fadb14'; // Yellow for future dates

        return (
            <div className="ant-picker-cell-inner" style={{ backgroundColor }}>
                {date.date()}
            </div>
        );
    };
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token');
        message.success('Logout successful!');
        navigate('/empsignin');
    };

    const [selectedDate, setSelectedDate] = useState(null);
    const [existingData, setExistingData] = useState(null);
    const [noShowDates, setNoShowDates] = useState([]);
    const [dataDates, setDataDates] = useState([]);



    const handleDateSelect = async (date) => {
        setSelectedDate(date);
        const formattedDate = date.format('YYYY-MM-DD');
        const isBeforeToday = date.isBefore(dayjs(), 'day'); // Check if the date is before today

        try {
            const response = await fetch(`https://backend-smoky-three.vercel.app/getInfoTimesheet/${formattedDate}/${employee_id}`);
            const data = await response.json();  

            if (data && data.length > 0) {
                setExistingData(data);
                setDataDates([...dataDates, formattedDate]);
            } else if (isBeforeToday) {
                setExistingData([{ signin: null, signout: null, work_detail: 'No show' }]); // Show as absent
                setNoShowDates([...noShowDates, formattedDate]);
            } else {
                setExistingData(null);
            }
        } catch (error) {
            message.error('Error fetching data');
        }
    };




    const { token } = theme.useToken();
    const wrapperStyle = {
        width: 300,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };


    const dateFullCellRender = (date) => {
        const formattedDate = date.format('YYYY-MM-DD');
        const isNoShow = noShowDates.includes(formattedDate);
        const hasData = dataDates.includes(formattedDate);
        const isWeekend = date.day() === 6 || date.day() === 0;
        const isAfterToday = date.isAfter(dayjs(), 'day');

        let backgroundColor = '';

        if (isNoShow) backgroundColor = '#ff4d4f'; // Red for no show
        else if (hasData) backgroundColor = '#52c41a'; // Green for data available
        else if (isWeekend) backgroundColor = '#ffc9f9'; // Pink for weekends
        else if (isAfterToday) backgroundColor = '#fadb14'; // Yellow for future dates

        return (
            <div className="ant-picker-cell-inner" style={{ backgroundColor }}>
                {date.date()}
            </div>
        );
    };


    const onFinish = async (values) => {
        try {
            const { signin, signout, work_detail } = values;
            const response = await fetch(`https://backend-smoky-three.vercel.app/getTimesheet/${employeeId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    signin: signin.format('HH:mm'), // Format TimePicker values
                    signout: signout.format('HH:mm'),
                    work_detail,
                }),
            });
    
            // Parse the response JSON if status is not 204 No Content
            const result = await response.json();
            
            // Check the response status to display appropriate messages
            if (response.ok) {
                message.success('Timesheet submitted successfully');
                window.location.reload();
                // Refresh or update state as necessary
            } else if (response.status === 400) {
                // Show a custom message based on the error
                if (result.error === "Employee ID does not exist.") {
                    message.error("The specified employee ID does not exist.");
                } else if (result.error === "Timesheet entry already exists for today.") {
                    message.warning("Timesheet entry already exists for today.");
                } else {
                    message.error("Failed to submit timesheet due to an unknown error.");
                }
            } else {
                message.error("Failed to submit timesheet. Please try again later.");
            }
        } catch (error) {
            message.error('Error submitting timesheet');
            console.error("Submission error:", error);
        }
    };
    
    return (
        <>
            <header className="lh-1 py-3">
                <Row justify="space-between" align="middle">
                    <Col xs={24} sm={8} className="text-center text-sm-left">
                        <a style={{ fontSize: "2rem" }} className="link-secondary" href="#">TCS</a>
                    </Col>
                    <Col xs={24} sm={8} className="text-center">
                        <Link to="/empdash">
                            <Button type="link" danger>
                                Apply for Leave
                            </Button>
                        </Link>

                    </Col>
                    <Col xs={24} sm={8} className="text-center text-sm-right">
                        <a className="link-secondary" href="#" aria-label="Search">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="mx-3" role="img" viewBox="0 0 24 24"><title>Search</title><circle cx="10.5" cy="10.5" r="7.5" /><path d="M21 21l-5.2-5.2" /></svg>
                        </a>
                        <Button onClick={handleLogout} type="primary" danger>
                            Logout
                        </Button>
                    </Col>
                </Row>
            </header>
            <div className='container'>
                <div className="mt-5">
                    <Breadcrumb
                        items={[
                            { href: '', title: <HomeOutlined /> },
                            {
                                href: '',
                                title: (
                                    <>
                                        <UserOutlined />
                                        <span>Timesheet</span>
                                    </>
                                ),
                            },
                            { title: `${employeeId}` },
                        ]}
                    />
                </div>
            </div>
            <div className='container text-center'>
                <div className='row'>
                    <div className='col-sm-12 col-md-12 col-lg-10'>
                        <div className="alert alert-primary mt-4" role="alert">
                        Completion of Information Security Awareness courses is a mandatory requirement for accessing all modules in Ultimatix, including Timesheet.
                        Please ensure that you are always compliant to the requirement.
                        </div>
                    </div>
                    <div className='col-md-12 col-lg-12 col-sm-12 '>
                        <div className='row'>
                            <div className='col-sm-6 col-md-6 col-lg-6 ' style={{ textAlign: 'left' }}>
                                <span className='left-head' style={{ fontFamily: "serif" }}>Timesheet entry for {currentDate}  </span>
                            </div>
                            <div className='col-sm-6 col-md-6 col-lg-6 '>
                                <span className='right-head' style={{ fontFamily: "serif" }}>Tcs- Lucknow Gomti nagar</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-12 col-md-4 p-4'>
                        <div className='shadow' style={wrapperStyle}>
                            <Calendar className='p-2' fullscreen={false} onSelect={handleDateSelect} dateFullCellRender={dateFullCellRender} />
                        </div>

                        <div className='p-2 rounded mt-4'>
                            <h5>Attendance Description:</h5>
                            <List
                                grid={{ gutter: 16, column: 3 }}
                                itemLayout="vertical"
                                style={{ marginTop: "2rem" }}
                                dataSource={[
                                    { date: <span className="badge rounded-pill text-bg-danger">A</span>, holiday: 'Absent' },
                                    { date: <span className="badge rounded-pill text-bg-success">P</span>, holiday: 'Present' },
                                ]}
                                renderItem={item => (
                                    <List.Item>
                                        <Row>
                                            <Col span={12}>
                                                <a href="https://example.com">{item.date}</a>
                                            </Col>
                                            <Col span={12}>
                                                <span>{item.holiday}</span>
                                            </Col>
                                        </Row>
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>
                    <div className='col-sm-12 col-md-8 mt-5'>
                        <div className='p-2 rounded mt-4 '>
                            <h5 className='time-head' style={{ marginLeft: "10%" }}>  Login hours <FieldTimeOutlined /></h5>



                            {existingData ? (
                                <Form
                                    {...formItemLayout}
                                    variant="filled"
                                    style={{ maxWidth: 600, marginTop: "3rem" }}
                                >
                                    <Form.Item label="Signin">
                                        <Tag color="#108ee9">
                                            {existingData[0].signin ? dayjs(existingData[0].signin).format('HH:mm') : <span >No show</span>}
                                        </Tag>
                                    </Form.Item>
                                    <Form.Item label="SignOut">
                                        <Tag color="#108ee9">
                                            {existingData[0].signout ? dayjs(existingData[0].signout).format('HH:mm') : <span >No show</span>}
                                        </Tag>
                                    </Form.Item>
                                    <Form.Item label="Work Detail">
                                        <Tag color="#108ee9">
                                            {existingData[0].work_detail || <span>no show</span>}
                                        </Tag>
                                    </Form.Item>
                                </Form>

                            ) : (

                                <Form
                                {...formItemLayout}
                                variant="filled"
                                style={{ maxWidth: 600, marginTop: "3rem" }}
                                onFinish={onFinish} // Trigger on form submission
                            >
                                <Form.Item
                                    label="Signin"
                                    name="signin" // Update name to "signin"
                                    rules={[{ required: true, message: 'Please input signin time!' }]}
                                >
                                    <TimePicker onChange={onChange} />
                                </Form.Item>
                                <Form.Item
                                    label="SignOut"
                                    name="signout" // Update name to "signout"
                                    rules={[{ required: true, message: 'Please input signout time!' }]}
                                >
                                    <TimePicker onChange={onChange} />
                                </Form.Item>
                                <Form.Item
                                    label="Work Detail"
                                    name="work_detail" // Update name to "work_detail"
                                    rules={[{ required: true, message: 'Please input work detail!' }]}
                                >
                                    <Input.TextArea />
                                </Form.Item>
                    
                                <Form.Item
                                    wrapperCol={{
                                        offset: 6,
                                        span: 16,
                                    }}
                                >
                                    <Button type="primary" danger htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                            )}

                        </div>
                    </div>
                </div>
            </div>


            <EmpFooter />
        </>
    );
}

export default Timesheet;
