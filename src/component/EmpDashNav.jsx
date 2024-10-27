import React from 'react';
import logo from "../images/logo.png";
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import {FieldTimeOutlined} from "@ant-design/icons"
import { message } from 'antd';


const EmpDashNav = ({ showLeaveHistory }) => {
    
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token');
        message.success('Logout successful!');
        navigate('/empsignin');
    };

    return (
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 ">
                <div className="col-md-3 mb-2 mb-md-0">
                    <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none">
                        <svg className="bi" width="40" height="32" role="img" aria-label="Bootstrap"></svg>
                        <img width="100" height="42" src={logo} alt="Logo" />
                    </a>
                </div>

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    {showLeaveHistory && (
                        <li>
                            <Link to="/emphistory">
                                <Button type="link" danger>
                                    Leave History
                                </Button>
                            </Link>
                        </li>
                    )}
                    <li>
                        <Link to="/timesheet">
                            <Button type="link" danger>
                                Log Your Hours < FieldTimeOutlined/>
                            </Button>
                        </Link>
                    </li>
                </ul>

                <div className="col-md-3 text-end">
                    <Button onClick={handleLogout} type="primary" danger>
                        Logout
                    </Button>
                </div>
            </header>
        </div>
    );
};

export default EmpDashNav;
