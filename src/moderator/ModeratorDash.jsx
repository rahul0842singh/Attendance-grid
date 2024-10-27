import React, { useState, useEffect } from 'react';
import { Button, Table, Space, Tabs, Popconfirm, Input, Row, Col, Modal, Form, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Navigate, useNavigate } from 'react-router-dom';

const { Search } = Input;

const ModeratorDash = () => {
    const [tabPosition] = useState('left');
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [updateModalVisible, setUpdateModalVisible] = useState(false);
    const [currentTab, setCurrentTab] = useState(null);
    const [form] = Form.useForm();
    const [orders, setOrders] = useState([]);
    const [companies, setCompanies] = useState([]); // State for company data

    const [currentRecord, setCurrentRecord] = useState(null);
    const [searchText, setSearchText] = useState({ tab1: '', tab2: '', tab3: '' });





























    
    // Sample data for the tables
    const initialData = [
        { key: '1', column1: 'Data 1', column2: 'Data 2', column3: 'Data 3', column4: 'Data 4' },
        { key: '2', column1: 'Data A', column2: 'Data B', column3: 'Data C', column4: 'Data D' },
        { key: '3', column1: 'Data 3', column2: 'Data 4', column3: 'Data 5', column4: 'Data 6' },
        { key: '4', column1: 'Data X', column2: 'Data Y', column3: 'Data Z', column4: 'Data W' },
        { key: '5', column1: 'Data M', column2: 'Data N', column3: 'Data O', column4: 'Data P' },
    ];

    const navigate = useNavigate()
    // Columns for the table
    const columns = [
        { title: 'Order ID', dataIndex: 'order_id', key: 'order_id' },
        { title: 'Reciept', dataIndex: 'receipt', key: 'receipt' },
        { title: 'Amount', dataIndex: 'amount', key: 'amount' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Pricing Plan', dataIndex: 'pricing_plan', key: 'pricing_plan' },
        { title: 'Currency', dataIndex: 'currency', key: 'currency' },
        { title: 'Payment Method', dataIndex: 'payment_method', key: 'payment_method' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => handleOpenUpdateModal(record)}>Update</Button>
                    <Popconfirm
                        title="Are you sure to delete this item?"
                        onConfirm={() => handleDelete(record.key)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="danger">Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];


    // Handle Delete action
    const handleDelete = (companyId) => {
        fetch(`/api/companies/${companyId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                   message.success("Deleted Successfully")
                    // Remove the deleted company from the companies state
                    setCompanies(prevCompanies => prevCompanies.filter(company => company.company_id !== companyId));
                } else {
                    console.error(`Failed to delete company: ${data.message}`);
                }
            })
            .catch(error => console.error('Error deleting company:', error));
    };


    // Handle Update action
    const handleOpenUpdateModal = (record) => {
        setCurrentRecord(record);
        form.setFieldsValue({
            company_id: record.company_id,
            company_name: record.company_name,
            owners_count: record.owners_count,
            total_member: record.total_member,
            logo: record.logo,
            establishment_date: record.establishment_date,
            email: record.email,
            phone: record.phone,
        });
        setUpdateModalVisible(true);
    };



    const handleAdd = (tab) => {
        setCurrentTab(tab);
        setAddModalVisible(true);
    };

    const handleAddSubmit = (values) => {
        console.log("Add new item:", values);
        setAddModalVisible(false);
        form.resetFields();
        // Implement add logic here
    };

    const handleUpdateSubmit = (values) => {
        const companyId = currentRecord.company_id;  // Get the company ID of the record being updated

        fetch(`/api/companies/${companyId}`, {
            method: 'PUT',  // Use PUT or PATCH based on your backend design
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),  // Send the updated values
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Company updated successfully:', data);
                    setUpdateModalVisible(false);  // Close the modal on success
                    form.resetFields();  // Reset the form fields
                    window.location.reload()

                    // Optionally, refresh the companies list or update the state to reflect the changes

                } else {
                    console.error('Failed to update company:', data.message);
                }
            })
            .catch(error => console.error('Error updating company:', error));
    };


    // Function to handle search input
    const onSearch = (value, tab) => {
        setSearchText((prev) => ({ ...prev, [tab]: value }));
    };

    // Function to filter data based on search input
    const filterData = (data, search) => {
        return data.filter((item) =>
            Object.keys(item).some((key) =>
                item[key].toString().toLowerCase().includes(search.toLowerCase())
            )
        );
    };


    useEffect(() => {
        fetch('/api/orders')  // Ensure this endpoint is correct and returns data
            .then(response => response.json())
            .then(data => {
                console.log('Fetched orders:', data);  // Check if data is logged
                setOrders(data);  // Set the orders state with fetched data
            })
            .catch(error => console.error('Error fetching orders:', error));
    }, []);


    useEffect(() => {
        fetch('/api/companies')  // Ensure this endpoint is correct and returns company data
            .then(response => response.json())
            .then(data => {
                console.log('Fetched companies:', data);  // Check if data is logged
                setCompanies(data);  // Set the companies state with fetched data
            })
            .catch(error => console.error('Error fetching companies:', error));
    }, []);


    const logout = () => {
        // Remove token from localStorage
        localStorage.removeItem('token');
        
        // Show logout message
        message.success("Logged out successfully");
        
        // Redirect to login page
        navigate('/adminSign');
    };


    const companyColumns = [
        { title: 'Company ID', dataIndex: 'company_id', key: 'company_id' },
        { title: 'Company Name', dataIndex: 'company_name', key: 'company_name' },
        { title: 'Owner', dataIndex: 'owners_count', key: 'owners_count' },
        { title: 'Total Members', dataIndex: 'total_member', key: 'total_member' },
        { title: 'Logo', dataIndex: 'logo', key: 'logo' },
        { title: 'Formation Date', dataIndex: 'establishment_date', key: 'establishment_date' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Phone', dataIndex: 'phone', key: 'phone' },
        {
            title: 'Actions',
            key: 'actions',
            fixed: 'right', // Fix the Actions column to the right
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => handleOpenUpdateModal(record)}>Update</Button>
                    <Popconfirm
                        title="Are you sure to delete this company?"
                        onConfirm={() => handleDelete(record.company_id)} // Pass company_id to the handleDelete function
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="danger">Delete</Button>
                    </Popconfirm>

                </Space>
            ),
        },
    ];


    const tab3Data = filterData(companies, searchText.tab3); // Use companies state for tab3



    // Filtered data for each tab
    const tab1Data = filterData(initialData, searchText.tab1);
    const tab2Data = filterData(initialData, searchText.tab2);



    return (
        <>

            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Admin_032</a>
                </div>
            </nav>

            <div className="container-fluid mt-5">
                <Row justify="center">
                    {/* <Col className="shadow-lg p-5 rounded" xs={24} sm={22} md={20} lg={18} xl={16}> */}
                    <Col className="shadow-lg p-5 rounded" xs={24} sm={24} md={22} lg={24} xl={20}>
                    <Space style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <h5>Moderator Dashboard</h5>
            <Button onClick={logout} type="primary"  style={{ marginLeft: 'auto' }}>
                Logout
            </Button>
        </Space>
                        <Tabs
                            tabPosition={tabPosition}
                            items={[
                                {
                                    label: 'Orders',
                                    key: '1',
                                    children: (
                                        <>
                                            <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
                                                <Search
                                                    placeholder="Search Orders"
                                                    onSearch={(value) => onSearch(value, 'tab1')}
                                                    style={{ flexGrow: 1, marginRight: 8 }}
                                                />
                                            </Space>
                                            {console.log('Orders to render:', orders)}  {/* Debugging */}
                                            <Table
                                                columns={columns.filter((col) => col.title !== 'Actions')}
                                                dataSource={filterData(orders, searchText.tab1)}  // Ensure you are using the filtered orders
                                                pagination={{ pageSize: 5 }}
                                                scroll={{ x: 'max-content' }} // Enable horizontal scrolling
                                            />
                                        </>
                                    ),
                                },

                           
                                {
                                    label: 'Company',
                                    key: '3',
                                    children: (
                                        <>
                                            <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
                                                <Search
                                                    placeholder="Search Company"
                                                    onSearch={(value) => onSearch(value, 'tab3')}
                                                    style={{ flexGrow: 1, marginRight: 8 }}
                                                />

                                            </Space>
                                            <Table
                                                columns={companyColumns}
                                                dataSource={tab3Data.map((company) => ({
                                                    ...company,
                                                    key: company.company_id,  // Ensure each row has a unique key
                                                }))}
                                                pagination={{ pageSize: 5 }}
                                                scroll={{ x: 'max-content' }} // Enable horizontal scrolling
                                            />

                                        </>
                                    ),
                                }

                            ]}
                        />
                    </Col>
                </Row>

                <footer style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#f1f1f1', textAlign: 'center', padding: '10px' }}>
                    <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
                </footer>
            </div>



            {/* Update Modal */}
            <Modal
                title={`Update Company in ${currentTab}`}
                visible={updateModalVisible}
                onCancel={() => setUpdateModalVisible(false)}
                footer={null}
            >
                <Form form={form} onFinish={handleUpdateSubmit}>
                    <Form.Item name="company_id" label="Company ID" rules={[{ required: true, message: 'Please input Company ID!' }]}>
                        <Input disabled />  {/* Assuming ID is not editable */}
                    </Form.Item>
                    <Form.Item name="company_name" label="Company Name" rules={[{ required: true, message: 'Please input Company Name!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="owners_count" label="Owners Count" rules={[{ required: true, message: 'Please input Owners Count!' }]}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item name="total_member" label="Total Members" rules={[{ required: true, message: 'Please input Total Members!' }]}>
                        <Input type="number" />
                    </Form.Item>

                    <Form.Item name="establishment_date" label="Formation Date" rules={[{ required: true, message: 'Please input Formation Date!' }]}>
                        <Input type="date" />
                    </Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType="submit">Update</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ModeratorDash;
