import React, { useState } from 'react';
import { Button } from 'antd';
import logo from "../images/logo.png";
import { Link } from 'react-router-dom';

const Navbar = ({ showLinks = true, showLoginButton = true, showRegisterButton = true }) => {
    const [size] = useState('large');
    return (
        <>
            <div className="container">
                <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 transparent-header">
                    <div className="col-md-3 mb-2 mb-md-0">
                        <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none">
                            <img src={logo} className="bi" width="150" height="52" role="img" aria-label="Bootstrap" />
                        </a>
                    </div>

                    {showLinks && (
                        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                            <li className="nav-item"><a href="#" className="nav-link mx-1 link-secondary">Home</a></li>
                            <li className="nav-item dropdown">
                                <a href="#features" className="nav-link mx-1 dropdown-toggle" id="featuresDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Features <i className="fas fa-chevron-down"></i>
                                </a>
                                <ul className="dropdown-menu text-center shadow" aria-labelledby="featuresDropdown">
                                    <li><a className="dropdown-item p-2" href="#">Real Time tracing</a></li>
                                    <li><a className="dropdown-item p-2" href="#">Accurate</a></li>
                                    <li><a className="dropdown-item p-2" href="#">24/7 support</a></li>
                                </ul>
                            </li>
                            <li className="nav-item"><a href="#pricing" className="nav-link mx-1">Pricing</a></li>
                            <li className="nav-item"><a href="#contact" className="nav-link mx-1">Contact</a></li>
                            <li className="nav-item"><a href="#values" className="nav-link mx-1">Values</a></li>
                        </ul>
                    )}

                    <div className="col-md-3 text-end">
                        {showLoginButton &&
                            (
                                <Link to="/sign">
                                    <Button size={size} danger>Login</Button>
                                </Link>

                            )}
                        {showRegisterButton && (
                            <Link to="/register">
                                <Button className='ms-2' type="primary" size={size} danger>Register</Button>
                            </Link>
                        )}
                    </div>
                </header>
            </div>
        </>
    );
};

export default Navbar;
