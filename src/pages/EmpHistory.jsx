import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Skeleton, Breadcrumb, Modal } from 'antd';
import EmpFooter from '../component/EmpFooter';
import EmpDashNav from '../component/EmpDashNav';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { message } from 'antd';


const EmpHistory = () => {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [leaveHistory, setLeaveHistory] = useState([]);
    const [displayedList, setDisplayedList] = useState([]);
   
    const [modalVisible, setModalVisible] = useState(false);
    const [leaveToCancel, setLeaveToCancel] = useState(null); // Store the leave ID to cancel
    const itemsPerPage = 8; // Number of items to display initially
    const [page, setPage] = useState(1); // Track current page

    const [employeeId, setEmployeeId] = useState('');
    useEffect(() => {
        const storedEmployeeId = localStorage.getItem('employee_id');
        if (storedEmployeeId) {
            setEmployeeId(storedEmployeeId);
        }
    }, []);

    useEffect(() => {
        if (employeeId) {
            getLeaveHistory();
        }
    }, [employeeId]);

    const getLeaveHistory = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/appliedLeave/${employeeId}`);
            const sortedHistory = response.data.sort((a, b) => a.status - b.status); // Sort to show "Not Approved" first
            setLeaveHistory(sortedHistory);
            setDisplayedList(sortedHistory.slice(0, itemsPerPage)); // Show the first 8 items initially
            setInitLoading(false);
        } catch (error) {
            console.error('Error fetching leave history:', error); // Handle error
        }
    };

    const onLoadMore = () => {
        const nextPage = page + 1;
        const newItems = leaveHistory.slice(0, nextPage * itemsPerPage); // Load more items based on the page
        setDisplayedList(newItems);
        setPage(nextPage);
        setLoading(false);
    };

    const loadMore = leaveHistory.length > displayedList.length ? (
        <div
            style={{
                textAlign: 'center',
                marginTop: 12,
                height: 32,
                lineHeight: '32px',
            }}
        >
            <Button onClick={onLoadMore}>Load More</Button>
        </div>
    ) : null;

    const handleCancel = (leaveId) => {
        console.log(leaveId);
        
        setLeaveToCancel(leaveId); // Store the ID of the leave to cancel
        setModalVisible(true); // Show the modal
    };

    const confirmCancel = async () => {
        if (leaveToCancel) {
            try {
                
                await axios.delete(`http://localhost:3000/deleteLeave/${leaveToCancel}`);
                console.log(`Leave application with ID ${leaveToCancel} has been cancelled.`); // Log success message
                // Refresh the leave history after cancellation
                await getLeaveHistory();
                message.success('Leave canceled successfully');
                setModalVisible(false); // Hide the modal
                setLeaveToCancel(null); // Reset the leave ID to cancel
            } catch (error) {
                message.error('Failed to cancel leave');
            }
        }
    };
    

    const handleModalCancel = () => {
        setModalVisible(false); // Close the modal without taking action
    };

    return (
        <>
            <EmpDashNav showLeaveHistory={false} />
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 ms-5 col-md-8 col-lg-8">
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
                                            <span>Leave History</span>
                                        </>
                                    ),
                                },
                                {
                                    title: `${employeeId}`,
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm-8 col-md-8 col-lg-8 ms-5">
                        <List
                            className="demo-loadmore-list"
                            loading={initLoading}
                            itemLayout="horizontal"
                            dataSource={displayedList}
                            renderItem={(item) => (
                                <List.Item
                                    actions={[
                                        <button
                                            key="list-status"
                                            style={{
                                                backgroundColor: item.status === 1 ? '#1890ff' : '#f0f0f0',
                                                color: item.status === 1 ? '#fff' : '#000',
                                                border: 'none',
                                                padding: '5px 10px',
                                                cursor: 'pointer',
                                                borderRadius: '4px',
                                            }}
                                        >
                                            {item.status === 1 ? 'Approved' : 'Not Approved'}
                                        </button>,
                                        item.status === 0 && (
                                            <Button
                                                key="list-cancel"
                                                type="danger"
                                                onClick={() => handleCancel(item.leave_applied_id)}
                                            >
                                                Cancel
                                            </Button>
                                        ),
                                    ]}
                                >
                                    <Skeleton avatar title={false} loading={false} active>
                                        <List.Item.Meta
                                            avatar={<Avatar src="https://via.placeholder.com/50" />}
                                            title={<span>{item.leaveType}</span>}
                                            description={`From: ${item.startDate} To: ${item.endDate}`}
                                        />
                                    </Skeleton>
                                </List.Item>
                            )}
                        />
                        {loadMore}
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            <Modal
                title="Confirm Cancellation"
                visible={modalVisible}
                onOk={confirmCancel}
                onCancel={handleModalCancel}
                okText="Yes"
                cancelText="No"
            >
                <p>Are you sure you want to cancel this leave application?</p>
            </Modal>

            <EmpFooter />
        </>
    );
};

export default EmpHistory;
