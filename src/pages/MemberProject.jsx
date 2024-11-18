import React, { useState, useEffect } from 'react';
import { message, Pagination } from 'antd';
import "../App.css"
import 'antd/dist/reset.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import EmpFooter from '../component/EmpFooter';
import { Button, Avatar, Tooltip, Modal, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined, SnippetsOutlined, UserOutlined } from '@ant-design/icons';
import { Space, Table, Tag } from 'antd';
import form from "../images/form.jpg"
import axios from 'axios';
import Password from 'antd/es/input/Password';


const { TextArea } = Input;

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const colors = ['#00BAFF', '#6f42c1'];

const MemberProject = () => {


  const storedProjectId = localStorage.getItem('projectId');
  const storedCompanyId = localStorage.getItem('companyId');


  const [empInProj, setEmpInProj] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Define how many items you want per page

  const location = useLocation();
  const { companyId, projectId } = location.state || {};
  const [showForm, setShowForm] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const [proDet, setProjDet] = useState([]);
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    employee_id: "",
    employee_name: "",
    emp_contact: "",
    password: "",
    work_detail: ""

  })

  console.log("Project id ", storedProjectId);


  const handleAddEmployeeClick = () => {
    setShowForm(true); // Show the form when "Add an employee" is clicked
  };

  const [projectIdFun, setProjectIdFun] = useState("");

  const getProjIdfun = () => {
    const project_id_fun = projectId;
    setProjectIdFun(project_id_fun); // Store the project ID in the state
    console.log(project_id_fun, "8888888");
  };

  const handleFormSubmit = async (values) => {
    try {
      const response = await fetch(`https://backend-smoky-three.vercel.app/AddEmpProj/${storedProjectId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        // Check if the error status is 409 for duplicate entry
        if (response.status === 409) {
          const errorData = await response.json();
          message.error(errorData.error || 'Duplicate entry: Employee ID already exists');
          return; // Exit the function early on duplicate entry error
        }
        throw new Error('Network response was not ok');
      }

      message.success('Employee added successfully!');
      window.location.reload();
      ProjectDetailload();
      setOpen(false);

    } catch (error) {
      message.error('Failed to add employee.');
      console.error(error);
    }
  };


  const HandleSubmitEmp = async (values) => {
    try {
      const response = await fetch(`https://backend-smoky-three.vercel.app/AddEmpProj/${projectIdFun}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const result = await response.json();
      message.success('Employee added successfully!');
      window.location.reload()
      ProjectDetailload();
      setOpen(false);

    } catch (error) {
      console.error('There was an error submitting the form!', error);
      message.error('Failed to add employee.');
    }
  };




  const [companyDetail, setCompanyDetail] = useState([]);
  const [countEmp, setCountEmp] = useState([]);

  const [editingEmployeeId, setEditingEmployeeId] = useState(null); // State for tracking the editing employee
  const [editingValues, setEditingValues] = useState({
    employee_name: '',
    work_detail: ''
  }); // State for storing input values during edit

  const handleStoreEmployeeId = (employee_id, storedProjectId, storedCompanyId) => {
    // Store the employee_id in localStorage
    localStorage.setItem('employeeId', employee_id);

  };


  const handleEditClick = (employee) => {
    setEditingEmployeeId(employee.employee_id); // Set the employee being edited
    setEditingValues({
      employee_name: employee.employee_name,
      work_detail: employee.work_detail,
    }); // Prefill the form with current values
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingValues({ ...editingValues, [name]: value });
  };

  const handleSave = async (employee_id) => {
    try {
      const response = await fetch(`https://backend-smoky-three.vercel.app/updateEmployee/${employee_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingValues),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      message.success('Employee updated successfully!');
      setEditingEmployeeId(null); // Reset editing state after successful update
      window.location.reload();
      ProjectDetailload();
    } catch (error) {
      console.error('Failed to update employee:', error);
      message.error('Failed to update employee.');
    }
  };


  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  useEffect(() => {
    ProjectDetailload();
  }, []);

  useEffect(() => {
    getCompanyDetail();
  }, [])

  useEffect(() => {
    getEmpInProject();
  }, [])

  useEffect(() => {
    countEmployee();
  }, [])

  const [searchEmpId, setSearchEmpId] = useState(''); // Add state for search/filter input

  // Filter employees based on search
  const filteredEmpInProj = empInProj.filter((emp) =>
    emp.employee_id.toString().toLowerCase().includes(searchEmpId.toLowerCase())
  );

  // Handler for search input change
  const handleSearchChange = (e) => {
    setSearchEmpId(e.target.value);
  };


  const getEmpInProject = async () => {
    try {
      const res = await axios.get(`https://backend-smoky-three.vercel.app/getEmpFromProj/${storedProjectId}`);
      setEmpInProj(res.data);
      console.log(res.data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  const ProjectDetailload = async () => {
    try {
      const res = await axios.get(`https://backend-smoky-three.vercel.app/getProjDet/${storedProjectId}`);
      setProjDet(res.data);
      console.log(projectId, "iiiiiiiiiii");


    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  const getCompanyDetail = async () => {
    try {
      const res = await axios.get(`https://backend-smoky-three.vercel.app/getCompanyDetail/${storedCompanyId}`);
      setCompanyDetail(res.data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  const countEmployee = async () => {
    try {
      const res = await axios.get(`https://backend-smoky-three.vercel.app/countEmp/${storedProjectId}`);
      setCountEmp(res.data);
      console.log(res.data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

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

  const confirmDelete = (employee_id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this employee?',
      content: `Employee ID: ${employee_id}`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          // Send DELETE request to the backend
          const response = await fetch(`https://backend-smoky-three.vercel.app/deleteEmp/${employee_id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) throw new Error('Failed to delete employee.');

          message.success('Employee deleted successfully!');

          getEmpInProject();
          setOpen(false);
        } catch (error) {
          console.error('Failed to delete employee:', error);
          message.error('Failed to delete employee.');
        }
      },
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    message.success('You have been logged out successfully.');
    navigate('/sign');
  };

  // Calculate employees to display based on current page and page size
  const paginatedEmpInProj = empInProj.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const columns = [
    {
      title: 'Employee Name',
      dataIndex: 'employee_name',
      key: 'employee_name',
      render: (text, record) => (
        editingEmployeeId === record.employee_id ? (
          <Input
            name="employee_name"
            value={editingValues.employee_name}
            onChange={handleInputChange}
          />
        ) : (
          <div>
            <Avatar style={{ backgroundColor: '#00BAFF', marginRight: '10px' }} icon={<UserOutlined />} />
            <a>{text}</a>
            <div style={{ fontSize: '12px', color: '#888', marginLeft: "13%" }}>
              {`ID: ${record.employee_id}`}
            </div>
          </div>
        )
      ),
    },
    {
      title: 'Work Detail',
      dataIndex: 'work_detail',
      key: 'work_detail',
      render: (text, record) => (
        editingEmployeeId === record.employee_id ? (
          <TextArea
            name="work_detail"
            value={editingValues.work_detail}
            onChange={handleInputChange}
            rows={2}
          />
        ) : (
          <p style={{ marginTop: '5px', wordWrap: 'break-word', maxWidth: '450px' }}>
            {text || "No work details provided"}
          </p>
        )
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '-10px' }}>
          {editingEmployeeId === record.employee_id ? (
            <Button type="primary" onClick={() => handleSave(record.employee_id)}>Submit</Button>
          ) : (
            <>
              <Tooltip title="See leave report" color={"blue"} >
                <Link
                  to={{
                    pathname: "/empreport",
                    state: {
                      projectId: storedProjectId,
                      companyId: storedCompanyId
                    }
                  }}
                >
                  <Button onClick={() => handleStoreEmployeeId(record.employee_id)} style={{ fontSize: "19px" }} type="link">
                    <SnippetsOutlined className='shadow' />
                  </Button>
                </Link>
              </Tooltip>
              <Tooltip title="Update the details" color={"blue"} >
                <Button style={{ fontSize: "19px" }} type="link" onClick={() => handleEditClick(record)}>
                  <EditOutlined className='shadow' />
                </Button>
              </Tooltip>
              <Tooltip title="Delete this employee" color={"orange"} >
                <Button style={{ fontSize: "19px" }} type="link" danger onClick={() => confirmDelete(record.employee_id)}>
                  <DeleteOutlined className='shadow' />
                </Button>
              </Tooltip>
            </>
          )}
        </div>
      ),
    },
  ];


  return (
    <>
      <div className="nav-scroller bg-body shadow-sm">
        <nav className="nav" aria-label="Secondary navigation">
          <a className="nav-link active" aria-current="page" href="#">
            {companyDetail.map((data) => (
              <>{data.company_name}</>
            ))} @Project-Members
          </a>
          <a className="nav-link" href="#">
            Total Employee
            <span className="badge text-bg-danger rounded-pill align-text-bottom">
              {countEmp.map((data) => (
                <>{data.total_employees}</>
              ))}
            </span>
          </a>
          <a onClick={handleAddEmployeeClick} className="nav-link add-proj" href="#">
            Add an employee <i style={{ fontSize: '1rem' }} className="bi bi-bookmark-plus"></i>
          </a>
          <a onClick={handleLogout} className="nav-link text-danger" href="#">
            Logout <i className="bi bi-arrow-right"></i>
          </a>
        </nav>
      </div>

      <main className="container mt-4">
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
            <h1 className="h6 mb-0 text-white lh-1">{formattedDate}</h1>
            <small>
              {companyDetail.map((data) => (
                <>@{data.company_name}</>
              ))}
            </small>
          </div>
          <Input // Add filter input box
            placeholder="Filter by Employee ID"
            value={searchEmpId}
            onChange={handleSearchChange}
            style={{
              marginLeft: 'auto',
              width: '250px',
              borderRadius: '4px',
            }}
          />
        </div>


        <div className="my-3 p-3 bg-body rounded shadow-sm ">
          <h6 className="border-bottom pb-2 mb-0">
            <span className="badge rounded-pill text-bg-secondary">
              {proDet.map((data) => (
                <>{data.project_name}</>
              ))}
            </span>
          </h6>








          {showForm ? (
            <>
              <div className='container p-4 '>
                <div className='row'>
                  <div className='col-lg-7 p-4 col-md-7 col-sm-7'>
                    <Form
                      name="addEmployee"
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 16 }}
                      initialValues={{ remember: true }}
                      onFinish={handleFormSubmit}
                      autoComplete="off"
                      style={{ marginTop: "10%" }}
                    >
                      <Form.Item
                        label="Employee Name"
                        name="employee_name"
                        rules={[{ required: true, message: 'Please input the employee name!' }]}
                      >
                        <Input className='shadow-sm' />
                      </Form.Item>

                      <Form.Item
                        label="Employee ID"
                        name="employee_id"
                        rules={[{ required: true, message: 'Please input the Employee ID!' }]}
                      >
                        <Input className='shadow-sm' />
                      </Form.Item>


                      <Form.Item
                        label="Employee Contact"
                        name="emp_contact"
                        rules={[{ required: true, message: 'Please input contact details!' }]}
                      >
                        <Input className='shadow-sm' />
                      </Form.Item>

                      <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input password!' }]}
                      >
                        <Input className='shadow-sm' />
                      </Form.Item>


                      <Form.Item
                        label="Task Assign"
                        name="work_detail"
                        rules={[{ required: true, message: 'Please input the task details!' }]}
                      >
                        <TextArea rows={4} className='shadow-sm' />
                      </Form.Item>



                      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                          Add to {companyDetail.map((data) => (
                            <>{data.company_name}</>
                          ))}
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                  <div className='col-lg-3 col-md-3 col-sm-3 d-none d-lg-block'>
                    <img style={{ marginLeft: "30%" }} src={form} height="400" width="400" alt="form" />
                  </div>
                </div>
              </div>

            </>
          ) : (
            <Table
              columns={columns}
              dataSource={filteredEmpInProj} // Use filtered employees for table data
              pagination={{
                current: currentPage,
                pageSize: pageSize,  // Limit to 3 data per page
                total: filteredEmpInProj.length,
                onChange: handlePageChange,
              }}
              scroll={{ x: 'max-content' }}
            />
          )}























        </div>
      </main>
      <EmpFooter />
    </>
  );
};

export default MemberProject;
