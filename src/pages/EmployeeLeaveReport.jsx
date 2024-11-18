import React, { useEffect, useState } from 'react';
import { Button, List, Skeleton, Pagination, Space, Avatar, Tooltip, Descriptions, Modal, message } from 'antd';
import "../App.css";
import EmpFooter from '../component/EmpFooter';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Divider, Flex, Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import QuestionCircleOutlined from "@ant-design/icons";
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
const colors = ['red'];

const onChange = (date, dateString) => {
  console.log(date, dateString);
};



const EmployeeLeaveReport = () => {


  const storedProjectId = localStorage.getItem('projectId');
  const storedCompanyId = localStorage.getItem('companyId');
  const employeeId = localStorage.getItem('employeeId');
  console.log("Employee ID:", employeeId);

  const onPageChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };



  const location = useLocation();
  const { employee_id } = location.state || {}; // Access the employee_id


  const labelStyle = {
    fontWeight: 'bold',
    color: '#000000',
  };

  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [cancelItem, setCancelItem] = useState(null); // To store the item to be canceled
  const [modalVisible, setModalVisible] = useState(false); // To manage modal visibility
  const [datacurrentDateHour, setdataCurrentDateHour] = useState([])
  const [rangeDateHour, setrangeDateHour] = useState([])
  const [randomDateHour, setrandomDateHour] = useState([])
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3); // Set items per page

  useEffect(() => {
    fetch(leaveAppliedId)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res.results);
        setList(res.results);
      });
  }, []);

  const paginatedData = list.slice((page - 1) * pageSize, page * pageSize);

  const CurrentDateHour = async () => {
    try {
      const res = await axios.get(`https://backend-smoky-three.vercel.app/getCurrentHour/${employeeId}`)
      setdataCurrentDateHour(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    message.success('You have been logged out successfully.');
    navigate('/sign');
  };

  const onRangePickerChange = (dates, dateStrings) => {
    if (dates && dates[0] && dates[1]) {
      const startDate = dateStrings[0]; // Start date in the format of YYYY-MM-DD
      const endDate = dateStrings[1]; // End date in the format of YYYY-MM-DD
      RangeDateHour(startDate, endDate); // Call the API with the selected date range
    }
  };

  const [dataRangeDateHour, setdataRangeDateHour] = useState([])
  const RangeDateHour = async (startDate, endDate) => {
    try {
      const res = await axios.get(`https://backend-smoky-three.vercel.app/getWorkingHourRange/${employeeId}/${startDate}/${endDate}`);
      setdataRangeDateHour(res.data);
      console.log("ddd", res.data);

    } catch (error) {
      console.log("got the error", error);
      console.log(startDate, endDate);

    }
  }

  const [selectedDate, setSelectedDate] = useState(null);

  const onChange = (date, dateString) => {
    setSelectedDate(dateString); // Update the state with the selected date
    if (dateString) {
      SingleDateHour(dateString); // Call SingleDateHour with the selected date
    }
  };

  const onSingleDateChange = (date, dateString) => {
    if (dateString) {
      SingleDateHour(dateString);
    }
  };


  const [datasingleDateHour, setdatasingleDateHour] = useState([])

  const SingleDateHour = async (date) => {

    try {
      const res = await axios.get(`https://backend-smoky-three.vercel.app/getSingleDayHour/${employeeId}/${date}`);
      setdatasingleDateHour(res.data);
      console.log("date", date);
      console.log("rtrtr", res.data);


    } catch (error) {
      console.error("Error fetching single date hour:", error);
    }
  };


  const [leaveBalance, setleaveBalance] = useState([])

  const leave_balance = async () => {
    try {
      const res = await axios.get(`https://backend-smoky-three.vercel.app/leaveBalance/${employeeId}`)
      setleaveBalance(res.data)
      console.log(res.data);

    } catch (error) {
      console.error("Error fetching single date hour:", error);
    }
  }

  const [leaveApplied, setLeaveApplied] = useState([])
  const leaveAppliedId = async () => {
    try {
      const res = await axios.get(`https://backend-smoky-three.vercel.app/appliedLeave/${employeeId}`)
      setLeaveApplied(res.data)
      console.log(res.data);
      


    } catch (error) {
      console.error("Error fetching single date hour:", error);
    }

  }


  useEffect(() => {
    CurrentDateHour();
    leave_balance();
    leaveAppliedId()
  }, [])

  const items = [
    {
      label: 'Daily Hours',
      children: (
        <span style={{ fontSize: "1rem" }} className="badge text-bg-primary">
          {datacurrentDateHour.length > 0 && datacurrentDateHour[0]?.working_hour ? (
            datacurrentDateHour.map((data) => (
              <React.Fragment key={data.id}> {/* Add a unique key */}
                {data.working_hour}
              </React.Fragment>
            ))
          ) : (
            "00:00:00"  // Default value if no data is fetched
          )}
        </span>
      ),
    },
    
    {
      label: (
        <Space>
          <RangePicker
            onCalendarChange={(dates, dateStrings) => {
              if (dates && dates[0] && dates[1]) {
                // Both start and end dates are selected
                onRangePickerChange(dates, dateStrings); // Fetch the data
              }
            }}
          />
          <Tooltip title="Enter start and end date to see the working Days in range" color="red">
            <label><i style={{ fontSize: "1.2rem" }} className="bi bi-question-circle"></i></label>
          </Tooltip>
        </Space>
      ),
      span: {
        xl: 2,
        xxl: 2,
      },
      children: (
        <span style={{ fontSize: "1rem" }} className="badge text-bg-primary">
          {
            dataRangeDateHour.length > 0 && dataRangeDateHour[0]?.total_working_hours ? (
              dataRangeDateHour.map((data, index) => (
                <React.Fragment key={index}>
                  {data.total_working_hours}
                </React.Fragment>
              ))
            ) : (
              "00:00:00"
            )
          }
        </span>
      ),
    },

    {
      label: (
        <Space>
          <DatePicker
            onChange={(date, dateString) => {
              if (dateString) {
                SingleDateHour(dateString); // Pass the dateString to fetch the data
              }
            }}
            format="YYYY-MM-DD" // Ensure the format is YYYY-MM-DD
          />
          <Tooltip title="Enter any particular date to working hour on that particular date" color="red">
            <label><i style={{ fontSize: "1.2rem" }} className="bi bi-question-circle"></i></label>
          </Tooltip>
        </Space>

      ),
      span: {
        xl: 2,
        xxl: 2,
      },
      children: <span style={{ fontSize: "1rem" }} className="badge text-bg-primary">
        {
          datasingleDateHour.length > 0 && datasingleDateHour[0]?.working_hour ? (
            datasingleDateHour.map((data, index) => (
              <React.Fragment key={index}>
                {data.working_hour}
              </React.Fragment>
            ))
          ) : (
            "00:00:00"
          )
        }

      </span>,
    },
    {
      label: 'Leave Balance',
      span: {
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 2,
        xxl: 2,
      },
      children: (
        <>
          {leaveBalance.length > 0 ? (
            leaveBalance.map((data) => (
              <>
                Casual leave: <span className='fw-bold'>{data.casual || 0}</span>
                <br />
                <br />
                Sick Leave: <span className='fw-bold'>{data.sick || 0}</span>
                <br />
                <br />
                Earned Leave: <span className='fw-bold'>{data.earned || 0}</span>
                <br />
                <br />
                Flexi Leave: <span className='fw-bold'>{data.flexi || 0}</span>
              </>
            ))
          ) : (
            <>
              Casual leave: <span className='fw-bold'>0</span>
              <br />
              <br />
              Sick Leave: <span className='fw-bold'>0</span>
              <br />
              <br />
              Earned Leave: <span className='fw-bold'>0</span>
              <br />
              <br />
              Flexi Leave: <span className='fw-bold'>0</span>
            </>
          )}

        </>
      ),
    }

  ];

  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          name: {},
          picture: {},
        })),
      ),
    );
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        const newData = data.concat(res.results);
        setData(newData);
        setList(newData);
        setLoading(false);
        window.dispatchEvent(new Event('resize'));
      });
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, [page, pageSize]);


  const handleApprove = async (leave_Applied_id) => {
    try {
      await axios.post(`https://backend-smoky-three.vercel.app/approveLeave/${leave_Applied_id}`);
      message.success('Leave approved successfully');
      fetchLeaveRequests(); // Reload the list
    } catch (error) {
      console.error("Error approving leave:", error);
      message.error('Failed to approve leave');
    }
  };

  const handleCancelRequest = (item) => {
    setCancelItem(item); // Store the leave request item
    setModalVisible(true); // Show the modal

  };

  const handleConfirmCancel = async () => {
    if (!cancelItem) {
      message.error('No leave selected for cancellation');
      return;
    }

    try {
      await axios.delete(`https://backend-smoky-three.vercel.app/deleteLeave/${cancelItem.leave_applied_id}`);
      message.success('Leave canceled successfully');
      setModalVisible(false);
      fetchLeaveRequests(); // Reload the list
    } catch (error) {
      console.error("Error canceling leave:", error);
      message.error('Failed to cancel leave');


    }
  };


  const fetchLeaveRequests = async () => {
    try {
      const res = await axios.get(`https://backend-smoky-three.vercel.app/appliedLeave/${employeeId}`);
      setList(res.data);
      setInitLoading(false);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };


  const handleCancel = () => {
    // Just hide the modal without cancelling
    setModalVisible(false);
  };

  const loadMore =
    !initLoading && !loading ? (
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

  return (
    <>
      <div className="nav-scroller bg-body shadow-sm">
        <nav className="nav" aria-label="Secondary navigation">
          <a className="nav-link active" aria-current="page" href="#">{employeeId}@ Leave Report  {employee_id}</a>
          <a onClick={handleLogout} className="nav-link text-danger" href="#">Logout <i className="bi bi-arrow-right"></i></a>
        </nav>
      </div>

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
            <h1 className="h6 mb-0 text-white lh-1">15 June, 2024</h1>
            <small>@Tata Consultancy services</small>
          </div>
        </div>
      </main>

      <div className='container'>
        <div className='row'>
          <div className='col-sm-10 col-md-10 col-lg-10'>
            <Descriptions
              className="custom-descriptions"
              bordered
              column={{
                xs: 1,
                sm: 2,
                md: 3,
                lg: 3,
                xl: 4,
                xxl: 4,
              }}
            >
              {items.map((item, index) => (
                <Descriptions.Item
                  key={index}
                  label={item.label}
                  span={item.span}
                  labelStyle={labelStyle}
                >
                  {item.children}
                </Descriptions.Item>
              ))}
            </Descriptions>
          </div>
        </div>
      </div>

      <main className='container mt-5'>
        <div className="d-flex align-items-center p-3 my-3 text-white bg-purple rounded shadow-sm">
          <div className="lh-1 ms-2">
            <h1 className="h6 mb-0 text-white lh-1">Applied Leave status for Emp id : {employeeId}</h1>

          </div>
        </div>
      </main>

      <div className='container'>
        <div className='row'>
          <div className='col-lg-10 col-md-10 col-sm-10'>
            <List
              className="demo-loadmore-list"
              loading={initLoading}
              itemLayout="horizontal"
              dataSource={paginatedData}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    item.status === 1 ? (
                      <Button type="default" disabled>
                        Approved
                      </Button>
                    ) : (
                      <>
                        <Button type="primary" style={{ backgroundColor: 'green', borderColor: 'green' }} onClick={() => handleApprove(item.leave_applied_id)}>
                          Approve
                        </Button>
                        <Button className='ms-2' type="dashed" onClick={() => handleCancelRequest(item)}>
                          Cancel
                        </Button>
                      </>
                    ),
                  ]}
                >
                  <Skeleton avatar title={false} loading={item.loading} active>
                    <List.Item.Meta
                      avatar={<Avatar size="large" icon={<UserOutlined />} />}
                      title={<span>{item.type_of_leave} ( {item.startDate} <span className='fw-bold'>  -  </span>{item.endDate} )</span> }
                      description={`Reason: ${item.reason}`}
                    />
                  </Skeleton>
                </List.Item>
              )}
            />

            <Pagination
              current={page}
              pageSize={pageSize}
              total={list.length}
              onChange={onPageChange}
              showSizeChanger
              pageSizeOptions={['5', '10', '15']}
              style={{ marginLeft: "40%" }}
            />



          </div>
        </div>
      </div>

      <EmpFooter />

      {/* Modal for Confirmation */}
      <Modal
        title="Confirm cancellation"
        visible={modalVisible}
        onOk={handleConfirmCancel}
        onCancel={handleCancel}
        okText="Confirm"
        cancelText="Cancel"
      >
        {cancelItem && (
          <p>Are you sure you want to cancel the leave request with ID: {cancelItem.leave_Applied_id}?</p>
        )}
      </Modal>

    </>
  )
}

export default EmployeeLeaveReport;
