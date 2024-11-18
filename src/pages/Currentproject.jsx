import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Avatar, List, Space, Button, Modal, Form, Input, message } from 'antd';
import "../App.css";
import EmpFooter from '../component/EmpFooter';
import { useLocation } from 'react-router-dom';
import sideimg from "../images/sideimg.png";
import { Link, Navigate, useNavigate } from 'react-router-dom';

const { TextArea } = Input;
const { confirm } = Modal;


const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

const Currentproject = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [data, setData] = useState([]);
    const [companyDetail, getCompanyDetail] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [formData, setFormData] = useState({
        project_name: "",
        project_total_members: "",
        project_desc: ""
    }); 

    const location = useLocation();
    const { companyId } = location.state || {};


    const handleLogout = () => {
        localStorage.removeItem('token');
        message.success('Logout successful!');
        navigate('/sign');
    };

    // useEffect(() => {
    //     if (companyId) {
    //         fetchCompanyDetail();
    //         fetchProjects();
    //     }
    // }, [companyId]);
    


    const fetchCompanyDetail = async () => {
        try {
            const company_id = companyId
            const response = await axios.get(`https://backend-smoky-three.vercel.app/getCompanyDetail/${company_id}`);
            getCompanyDetail(response.data);
            console.log("ghf", companyDetail[1]);

        } catch (error) {
            console.error('Failed to fetch projects:', error);
        }
    };


    const fetchProjects = async () => {
        try {
            const company_id = companyId
            const response = await axios.get(`https://backend-smoky-three.vercel.app/project/${company_id}`);
            setData(response.data);
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (values) => {
        try {
  
            const response = await fetch(`https://backend-smoky-three.vercel.app/insertProject/${companyId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
    
            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();

            message.success('Project added successfully!');
            fetchProjects();
            setOpen(false);
            
        } catch (error) {
            console.error('There was an error submitting the form!', error);
            message.error('Failed to add project.');
        }
    };

    useEffect(() => {
        const storedCompanyId = localStorage.getItem('companyId');
        if (companyId || storedCompanyId) {
            fetchCompanyDetail(companyId || storedCompanyId);
            fetchProjects(companyId || storedCompanyId);
        }
    }, [companyId]);
    


    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };




    const showDeleteConfirm = (project_id) => {
        confirm({
            title: 'Are you sure you want to delete this project?',
            icon: <ExclamationCircleOutlined />,
            content: 'This action cannot be undone.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleDelete(project_id);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const handleDelete = async (project_id) => {
        console.log(project_id);

        try {
            await axios.delete(`https://backend-smoky-three.vercel.app/deleteComapny/${project_id}`);
            setData(data.filter(item => item.project_id !== project_id));
            message.success('Project deleted successfully!');
        } catch (error) {
            console.error('Failed to delete project:', error);
            message.error('Failed to delete project.');
        }
    };

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredData = data.filter(item =>
        item.project_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark" aria-label="Main navigation">
                <div className="container-fluid all-link">
                    <a className="navbar-brand heading_company text-white" href="#">
                        {
                            companyDetail.map((data) => {
                                return (
                                    <>
                                        {data.company_name} @ongoing Projects
                                    </>
                                )
                            })
                        }

                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Button onClick={showModal} className='add-proj'>Add your project <i style={{ fontSize: "1.2rem" }} className="bi bi-plus"></i></Button>
                            </li>

                            <li className="nav-item">
                                <Button onClick={handleLogout} className='add-proj ms-2'>Logout <i style={{ fontSize: "1.2rem" }} className="bi bi-box-arrow-right"></i></Button>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <Button className='add-proj'>Find <i className="bi bi-search"></i></Button>
                        </form>
                    </div>
                </div>
            </nav>

            <Modal
                className='modal-form'
                title={<label style={{ marginLeft: "28%" }}>Describe your project</label>}
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={handleSubmit}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        style={{ marginTop: "5%" }}
                        label={<label>Project Title</label>}
                        name="project_name"
                        value={formData.project_name}
                        onChange={handleChange}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Project title!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={<label>No. of members</label>}
                        name="project_total_members"
                        value={formData.project_total_members}
                        onChange={handleChange}
                        rules={[
                            {
                                required: true,
                                message: 'Mention all members',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="project_desc"
                        value={formData.project_desc}
                        onChange={handleChange}
                        rules={[
                            {
                                required: true,
                                message: 'Please describe your project!',
                            },
                        ]}
                        label="Project Description"
                    >
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <div style={{ marginTop: "6.5rem" }} className='container'>
                <div className="row">
                    <div className='col-sm-12 col-md-8'>
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                onChange: (page) => {
                                    console.log(page);
                                },
                                pageSize: 3,
                            }}
                            dataSource={filteredData}
                            renderItem={(item, index) => (
                                <List.Item
                                    key={item.project_id}
                                    actions={[
                                        <Button
                                            type="text"
                                            icon={<DeleteOutlined />}
                                            onClick={() => showDeleteConfirm(item.project_id)}
                                            style={{ color: 'red' }} // Set the color to red
                                        >
                                            Delete
                                        </Button>
                                    ]}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                                        title={
                                            <Link
                                                to={{
                                                    pathname: "/member",
                                                }}
                                                state={{
                                                    companyId: companyId,
                                                    projectId: item.project_id,
  
                                                }}
                                                onClick={() => {
                                                    localStorage.setItem('projectId', item.project_id); // Store project ID in localStorage
                                                    localStorage.setItem('companyId', companyId); // Store company ID in localStorage
                                                }}
                                            >
                                                {item.project_name}
                                            </Link>

                                        }
                                        description={`Members: ${item.project_total_members}`}
                                    />

                                    {item.project_desc}
                                </List.Item>
                            )}
                        />
                    </div>
                    <div className='col-sm-12 col-md-4 d-none d-md-flex justify-content-center align-items-center'>
                        <img className="animated-img" src={sideimg} alt="Side" style={{ maxWidth: '100%', height: 'auto' }} />
                    </div>
                </div>
            </div>


            <EmpFooter />
        </>
    );
};

export default Currentproject;
