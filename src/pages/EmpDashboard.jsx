import React, { useState, useEffect } from 'react';
import "../App.css"
import EmpDashNav from '../component/EmpDashNav';
import axios from "axios"
import { useLocation, useNavigate } from 'react-router-dom';
import { message, Upload } from 'antd';
import { Row, Col, Calendar, theme, DatePicker, Button, List, Skeleton, Badge, Space, Avatar, Tooltip, Descriptions, Modal, Form, Input, Select } from 'antd';
import EmpFooter from '../component/EmpFooter';
import moment from 'moment'; // Optional: To format date easily
import { PlusOutlined } from '@ant-design/icons';
const { TextArea } = Input;
const { Dragger } = Upload;






const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
};
const onChange = (date, dateString) => {
    console.log(date, dateString);
};



const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};


const EmpDashboard = () => {

    const [employeeId, setEmployeeId] = useState('');

    useEffect(() => {
        // Retrieve the employee ID from local storage
        const storedEmployeeId = localStorage.getItem('employee_id');
        if (storedEmployeeId) {
            setEmployeeId(storedEmployeeId);
        } else {
            console.log('No employee ID found in local storage.');
        }
    }, []); // Empty dependency array means this runs once on component mount

    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');



    const [projectDetails, setprojectDetails] = useState([])

    useEffect(() => {
        if (userDetails && userDetails.length > 0) {
            getProjectDetails();
        }
    }, [userDetails]); // Depend on userDetails to trigger this effect

    const getProjectDetails = async () => {
        try {
            const projectId = userDetails[0]?.emp_id_project || 'no'; // Safely get emp_id_project
            const response = await axios.get(`http://localhost:3000/getProjDet/${projectId}`);
            setprojectDetails(response.data);

        } catch (error) {
            console.error("Error fetching project details:", error); // Handle error
        }
    };





    const [leaveBalance, setleaveBalance] = useState([])

    useEffect(() => {
        if (userDetails && userDetails.length > 0) {
            getLeaveBalance();
        }
    }, [userDetails]); // Depend on userDetails to trigger this effect

    const getLeaveBalance = async () => {
        try {

            const response = await axios.get(`http://localhost:3000/leaveBalance/${employeeId}`);
            setleaveBalance(response.data);

        } catch (error) {
            console.error("Error fetching project details:", error); // Handle error
        }
    };




    const items = [
        {
            key: '1',
            label: 'Earned Leave',
            children: <label style={{ color: "red", fontWeight: "bolder" }}>{leaveBalance[0]?.earned}</label>,
        },
        {
            key: '2',
            label: 'Sick Leave',
            children: <label style={{ color: "red", fontWeight: "bolder" }}>{leaveBalance[0]?.sick}</label>,
        },
        {
            key: '3',
            label: 'Flexi Leave',
            children: <label style={{ color: "red", fontWeight: "bolder" }}>{leaveBalance[0]?.flexi}</label>,
        },
        {
            key: '4',
            label: 'Casual Leave',
            children: <label style={{ color: "red", fontWeight: "bolder" }}>{leaveBalance[0]?.casual}</label>,
        },
    ];


    const [form] = Form.useForm();
    const { token } = theme.useToken();

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [numberOfDays, setNumberOfDays] = useState(0);
    const [submitEnabled, setSubmitEnabled] = useState(false);
    const [uploadEnabled, setUploadEnabled] = useState(false);


    const wrapperStyle = {
        width: '100%',
        border: `1px solid #ABABAB`,
        borderRadius: token.borderRadiusLG,
        marginTop: "1rem"
    };

    const [fileList, setFileList] = useState([]);

    const handleFileChange = ({ fileList }) => {
        setFileList(fileList);
    };

    const onFinish = async (values) => {
        // Prepare data for submission
        const formData = new FormData();
        formData.append('type_of_leave', values.leaveType);
        formData.append('emp_id', employeeId); // Replace with actual employee ID
        formData.append('emp_name', userDetails[0].employee_name); // Replace with actual employee name
        formData.append('reason', values.reason);
        formData.append('numberOfDays', numberOfDays);

        // Add startDate and endDate to the form data
        formData.append('startDate', startDate ? startDate.format('YYYY-MM-DD') : null); // Format the date
        formData.append('endDate', endDate ? endDate.format('YYYY-MM-DD') : null); // Format the date

        // Upload document if it exists
        if (fileList.length > 0) {
            formData.append('medical_Doc', fileList[0].originFileObj);
        }

        console.log("FormData Object:", formData);

        try {
            const response = await axios.post('http://localhost:3000/apply-leave', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Success message
            message.success('Your leave application has been submitted successfully! We will notify you once it is processed.');

            // Reload the page after 2 seconds
            setTimeout(() => {
                window.location.reload();
            }, 2000);

        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errorMessage = error.response.data.error;

                if (errorMessage.includes("Leave already applied for the selected date range")) {
                    // Show specific warning for overlapping leave dates
                    message.warning("Leave already applied for the selected date range. Please choose different dates.");
                } else if (errorMessage.includes("Insufficient leave balance")) {
                    // Show warning for insufficient leave balance
                    message.warning("Your leave balance is not sufficient.");
                } else {
                    // Generic error message
                    message.error('Please try again.');
                }
            } else {
                // Handle other errors
                message.error('An unexpected error occurred. Please try again.');
            }
        }
    };


    // Handle start date change
    const handleStartDateChange = (date) => {
        const formattedStartDate = date ? date.format('YYYY-MM-DD') : '';
        setStartDate(date);  // Store start date in state

    };

    // Handle end date change

    const handleEndDateChange = (date) => {
        setEndDate(date);  // Store end date in state

        if (startDate && date) {
            // Calculate the number of days directly here
            const daysDifference = date.diff(startDate, 'days') + 1; // Adding 1 to include both start and end dates
            setNumberOfDays(daysDifference);  // Update the number of days in state
            console.log('Days Difference:', daysDifference);
        }
    };


    const updateSubmitAndUploadState = (start, end) => {
        if (start && end) {
            const daysDifference = end.diff(start, 'days') + 1;
            if (daysDifference === 1 || daysDifference === 2) {
                setSubmitEnabled(true); // Enable the submit button for 1 or 2 days
                setUploadEnabled(false); // Disable the upload section
            } else if (daysDifference >= 3) {
                setSubmitEnabled(false); // Disable the submit button until upload is successful
                setUploadEnabled(true); // Enable the upload section for 3 or more days
            }
        }
    };





    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    useEffect(() => {
        const fetchUserDetails = async () => {
            // Retrieve the employee ID from local storage
            const employeeId = localStorage.getItem('employee_id');

            if (!employeeId) {
                setError('No Employee ID found in local storage.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:9000/getDetailsOfemp/${employeeId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming JWT is used for authorization
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user details.');
                }

                const data = await response.json();
                setUserDetails(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);



    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        // Get the current date and format it as required
        const today = moment().format('DD MMMM, YYYY'); // Example: 12 October, 2024
        setCurrentDate(today);
    }, []);




    const [leaveData, setLeaveData] = useState([]); // To store leave data with statuses

    useEffect(() => {
        if (employeeId) {
            axios.get(`http://localhost:3000/appliedLeave/${employeeId}`)
                .then((response) => {
                    setLeaveData(response.data);
                    console.log('Leave Data:', response.data); // Log leave data
                })
                .catch((error) => {
                    console.error('Error fetching leave data:', error);
                });
        }
    }, [employeeId]);


    const dateCellRender = (value) => {
        const currentDate = value.format('YYYY-MM-DD'); // Format the calendar date for comparison
        const approvedLeaves = leaveData.filter(leave => leave.status === 1 && leave.startDate <= currentDate && leave.endDate >= currentDate);
        const unapprovedLeaves = leaveData.filter(leave => leave.status === 0 && leave.startDate <= currentDate && leave.endDate >= currentDate);

        return (
            <div>
                {approvedLeaves.length > 0 && <Badge status="success"  />}
                {unapprovedLeaves.length > 0 && <Badge status="error"  />}
            </div>
        );
    };



    // Function to render content for each date cell
   
    return (
        <>
            <EmpDashNav showLeaveHistory={true} />
            <main className='container'>
                <div className="d-flex align-items-center p-3 my-3 text-white bg-purple rounded shadow-sm">
                    <Avatar
                        style={{
                            backgroundColor: '#fde3cf',
                            color: '#f56a00',
                        }}
                    >
                        T
                    </Avatar>
                    <div className="lh-1 ms-2">
                        <h1 className="h6 mb-0 text-white lh-1">{currentDate}</h1> {/* Dynamic current date */}
                        <small>
                            @  {projectDetails.map((project, index) => (
                                project.project_name
                            ))}
                        </small>
                    </div>
                    <div className="ms-auto d-flex align-items-center">
                        <i className="fas fa-phone-alt me-2"></i>
                        <span>


                            +91 {userDetails && userDetails.length > 0 ? userDetails[0].emp_contact : 'Loading...'}


                        </span>
                    </div>
                </div>

                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <label className='top-head text-center' style={{ margin: "0 auto", display: "block", maxWidth: "100%" }}>
                                If you are applying leave for more than or equal to 3 days, in case of sick leave, you should submit the medical documents.
                            </label>
                        </div>
                    </div>
                </div>

            </main>


            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-sm-12 col-md-4 p-4'>
                        <label style={{ display: 'block', textAlign: 'center', fontFamily: "-moz-initial" }}>Apply Leave</label>
                        <div className='shadow' style={wrapperStyle}>
                            <Calendar  cellRender={dateCellRender} className='p-2' fullscreen={false} onPanelChange={onPanelChange} />
                           
                        </div>
                        <div className='p-2 rounded mt-4'>
                            <h5>Holidays Description:</h5>
                            <List
                                grid={{ gutter: 16, column: 3 }}
                                itemLayout="vertical"
                                style={{ marginTop: "2rem" }}
                                dataSource={[
                                    { date: <span class="badge rounded-pill text-bg-danger">P</span>, holiday: 'Pending Leave' },
                                    { date: <span class="badge rounded-pill text-bg-success">A</span>, holiday: 'Approved Leave' },
                                    // { date: <span class="badge rounded-pill text-bg-danger">F</span>, holiday: 'Flexi Leave' },
                                    // { date: <span class="badge rounded-pill text-bg-warning">H</span>, holiday: 'Holiday' },
                                    // { date: <span class="badge rounded-pill text-bg-secondary">W</span>, holiday: 'Weekend' },
                                ]}
                                renderItem={item => (
                                    <List.Item>
                                        <Row>
                                            <Col span={12} >
                                                <a href="https://example.com">{item.date}</a>
                                            </Col>
                                            <Col span={12} >
                                                <span>{item.holiday}</span>
                                            </Col>
                                        </Row>
                                    </List.Item>
                                )}
                            />
                        </div>

                        <div className='p-2 rounded mt-4'>
                            <h5>Holiday in 25th June 2024:</h5>
                            <List
                                itemLayout="horizontal"
                                dataSource={[
                                    { date: 'Mon, 17 June', holiday: 'Id ul Zuha / Eidul Azha / Bakri Eid' }
                                ]}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta

                                            description={item.holiday}
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>

                    </div>
                    <div className='col-sm-12 col-md-8'>
                        <div className='p-2 rounded mt-4'>
                            <Descriptions title="Available Leave Balance" items={items} />
                        </div>

                        <div className='p-2 rounded mt-4'>
                            <Form
                                form={form}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                className="row gy-2 gx-3 align-items-center"
                                layout="vertical"
                            >
                                <div className="col-8 col-md-4">
                                    <Form.Item label="Start Date" name="startDate" rules={[{ required: true, message: 'Please select a start date!' }]}>
                                        <DatePicker name="startDate" onChange={handleStartDateChange} style={{ width: '100%' }} />
                                    </Form.Item>
                                </div>
                                <div className="col-8 col-md-4">
                                    <Form.Item label="End Date" name="endDate" rules={[{ required: true, message: 'Please select an end date!' }]}>
                                        <DatePicker name="endDate" onChange={handleEndDateChange} style={{ width: '100%' }} />
                                    </Form.Item>
                                </div>
                                <div className="col-8 col-md-4">
                                    <Form.Item label="Type of Leave" name="leaveType" rules={[{ required: true, message: 'Please select a leave type!' }]}>
                                        <Select
                                            defaultValue="select type of leave"
                                            style={{ width: '100%' }}
                                            options={[
                                                { value: 'earned', label: 'Earned Leave' },
                                                { value: 'sick', label: 'Sick Leave' },
                                                { value: 'flexi', label: 'Flexi Leave' },
                                                { value: 'casual', label: 'Casual Leave' },
                                            ]}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="col-8 col-md-4">
                                    <Form.Item label="Number of Days" name="numberOfDays">
                                        <label style={{ marginLeft: "2rem" }}>{numberOfDays}</label>
                                    </Form.Item>
                                </div>
                                <div className="col-8">
                                    <Form.Item label="Detailed Reason" name="reason" rules={[{ required: true, message: 'Please provide a reason!' }]}>
                                        <TextArea rows={3} />
                                    </Form.Item>
                                </div>
                                <div className="col-8">
                                    <Form.Item label="Upload Document" name="medical_Doc">
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
                                </div>
                                <div className="col-8">
                                    <Button type="primary" htmlType="submit" >
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        </div>


                    </div>
                </div>
            </div>

            <EmpFooter />
        </>
    );
};

export default EmpDashboard;
