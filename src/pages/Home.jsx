import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from "../images/logo.png";
import hero from "../images/hero-img.png"
import { DownloadOutlined } from '@ant-design/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import client1 from "../images/clients/client-1.png"
import client2 from "../images/clients/client-2.png"
import client3 from "../images/clients/client-3.png"
import client4 from "../images/clients/client-4.png"
import client5 from "../images/clients/client-5.png"
import client6 from "../images/clients/client-6.png"
import client7 from "../images/clients/client-7.png"
import client8 from "../images/clients/client-8.png"
import values1 from "../images/values-1.png"
import values2 from "../images/values-2.png"
import values3 from "../images/values-3.png"
import feature1 from "../images/features.png"
import feature2 from "../images/features-2.png"
import 'bootstrap-icons/font/bootstrap-icons.css';
import PureCounter from '@srexi/purecounterjs';
import pricing from "../images/pricing-free.png";
import pricingstarter from "../images/pricing-starter.png";
import pricingbusisness from "../images/pricing-business.png"
import pricingultimate from "../images/pricing-ultimate.png"
import Team1 from "../images/men1.jpeg"
import Team2 from "../images/women1.jpg"
import Team3 from "../images/men2.jpg"
import Team4 from "../images/women2.jpg"
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { Link } from 'react-router-dom';


const Home = () => {


  

    const navigate = useNavigate();

    const handlePlanSelect = (pricing_plan, amount) => {
        navigate('/checkout', { state: { pricing_plan, amount } });
    };


    const swiperConfig = {
        loop: true,
        speed: 600,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        slidesPerView: 'auto',
        pagination: false,
        breakpoints: {
            320: {
                slidesPerView: 2,
                spaceBetween: 40,
            },
            480: {
                slidesPerView: 3,
                spaceBetween: 60,
            },
            640: {
                slidesPerView: 4,
                spaceBetween: 80,
            },
            992: {
                slidesPerView: 5,
                spaceBetween: 120,
            },
            1200: {
                slidesPerView: 6,
                spaceBetween: 120,
            },
        },
    };

    const clients = [
        client1,
        client2,
        client3,
        client4,
        client5,
        client6,
        client7,
        client8
    ];

    const [size, setSize] = useState('large');

    useEffect(() => {
        new PureCounter();
    }, []);

    return (
        <>
            <section id="topbar" className="topbar d-flex align-items-center">
                <div className="container d-flex flex-column flex-md-row justify-content-center justify-content-md-between">
                    <div className="contact-info d-flex align-items-center justify-content-center justify-content-md-start mb-2 mb-md-0">
                        <i className="bi bi-envelope d-flex align-items-center"><a className="mail" href="mailto:kumar_rahulkkcs@yahoo.com">kumar_rahulkkcs@yahoo.com</a></i>
                        <i className="bi bi-phone d-flex align-items-center ms-4"><span>+91 8340251638</span></i>
                    </div>
                    <div className="social-links d-flex align-items-center justify-content-center justify-content-md-end">
                        <a href="#" className="twitter text-white "><i className="bi bi-twitter"></i></a>
                        <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                        <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                        <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
                    </div>
                </div>
            </section>


            <Navbar />


            <section id="hero" className="hero section">
                <div className="container">
                    <div className="row gy-4">
                        <div className="col-lg-6  mb-5 hero-div order-2 order-lg-1 d-flex flex-column justify-content-center  typewriter ">
                            <h1 className='hero-img-one  ' >We offer modern attendance tracking of your <span className='res '>Employees</span></h1>
                            <p data-aos-delay="100">Track Every Minute, Perfect Every Attendance</p>
                            <div style={{ marginBottom: "8rem" }} className="d-flex flex-column flex-md-row" data-aos="fade-up" data-aos-delay="200">
                                <Link to="/register">
                                    <Button style={{ fontSize: '16px', padding: '25px 35px' }} danger type="primary" size={size}>
                                        Get Started
                                    </Button>
                                </Link>
                                <a href="https://www.youtube.com/watch?v=LXb3EKWsInQ" className="glightbox btn-watch-video d-flex align-items-center justify-content-center ms-0 ms-md-4 mt-4 mt-md-0"><i className="bi bi-play-circle"></i><span>Watch Video</span></a>
                            </div>
                        </div>
                        <div style={{ marginBottom: "8rem" }} className="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-out">
                            <img src={hero} className="img-fluid animated" alt="" />
                        </div>
                    </div>
                </div>
            </section>



            <section id="clients" className="clients section">
                <div className="container" data-aos="zoom-in">
                    <Swiper {...swiperConfig} modules={[Autoplay, Pagination]}>
                        {clients.map((client, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={`${client}`}
                                    className="img-fluid"
                                    alt={`Client ${index + 1}`}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="swiper-pagination"></div>
                </div>
            </section>




            <section id="values" class="values mt-5">

                <div class="container" data-aos="fade-up">

                    <header class="section-header">
                        <h2>Our Values</h2>
                        <p>What we value most</p>
                    </header>

                    <div class="row">

                        <div class="col-lg-4" data-aos="fade-up" data-aos-delay="200">
                            <div class="box">
                                <img src={values3} class="img-fluid" alt="" />
                                <h3>Precise Tracking, Reliable Records</h3>
                                <p>We prioritize accurate attendance tracking to ensure every minute is counted and every record is reliable.</p>
                                <p></p>
                            </div>
                        </div>

                        <div class="col-lg-4 mt-4 mt-lg-0" data-aos="fade-up" data-aos-delay="400">
                            <div class="box">
                                <img src={values1} class="img-fluid" alt="" />
                                <h3>User-Friendly Interface</h3>
                                <p>Our intuitive design ensures that users can effortlessly navigate the system. With a focus on simplicity, our platform maximizes efficiency.</p>
                            </div>
                        </div>

                        <div class="col-lg-4 mt-4 mt-lg-0" data-aos="fade-up" data-aos-delay="600">
                            <div class="box">
                                <img src={values2} class="img-fluid" alt="" />
                                <h3>Protecting Your Information, Ensuring Privacy.</h3>
                                <p>We understand the importance of keeping your data secure and system employs advanced security .</p>
                            </div>
                        </div>

                    </div>

                </div>

            </section>






            <section id="counts" className="counts">
                <div className="container" data-aos="fade-up">
                    <div className="row gy-4">
                        <div className="col-lg-3 col-md-6">
                            <div className="count-box">
                                <i className="bi bi-emoji-smile"></i>
                                <div>
                                    <span
                                        data-purecounter-start="0"
                                        data-purecounter-end="232"
                                        data-purecounter-duration="1"
                                        className="purecounter"
                                    ></span>
                                    <p>Happy Clients</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="count-box">
                                <i className="bi bi-journal-richtext" style={{ color: '#ee6c20' }}></i>
                                <div>
                                    <span
                                        data-purecounter-start="0"
                                        data-purecounter-end="521"
                                        data-purecounter-duration="1"
                                        className="purecounter"
                                    ></span>
                                    <p>Projects</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="count-box">
                                <i className="bi bi-headset" style={{ color: '#15be56' }}></i>
                                <div>
                                    <span
                                        data-purecounter-start="0"
                                        data-purecounter-end="1463"
                                        data-purecounter-duration="1"
                                        className="purecounter"
                                    ></span>
                                    <p>Hours Of Support</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="count-box">
                                <i className="bi bi-people" style={{ color: '#bb0852' }}></i>
                                <div>
                                    <span
                                        data-purecounter-start="0"
                                        data-purecounter-end="15"
                                        data-purecounter-duration="1"
                                        className="purecounter"
                                    ></span>
                                    <p>Hard Workers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>






            <section id="features" class="features">

                <div class="container" data-aos="fade-up">

                    <header class="section-header">
                        <h2>Features</h2>
                        <p>Our Advance Features</p>
                    </header>

                    <div class="row">

                        <div class="col-lg-6">
                            <img src={feature1} class="img-fluid" alt="" />
                        </div>

                        <div class="col-lg-6 mt-5 mt-lg-0 d-flex">
                            <div class="row align-self-center gy-4">

                                <div class="col-md-6" data-aos="zoom-out" data-aos-delay="200">
                                    <div class="feature-box d-flex align-items-center">
                                        <i class="bi bi-check"></i>
                                        <h3>Real-Time Tracking</h3>
                                    </div>
                                </div>

                                <div class="col-md-6" data-aos="zoom-out" data-aos-delay="300">
                                    <div class="feature-box d-flex align-items-center">
                                        <i class="bi bi-check"></i>
                                        <h3>Automated Reports</h3>
                                    </div>
                                </div>

                                <div class="col-md-6" data-aos="zoom-out" data-aos-delay="400">
                                    <div class="feature-box d-flex align-items-center">
                                        <i class="bi bi-check"></i>
                                        <h3>Custom Alerts</h3>
                                    </div>
                                </div>

                                <div class="col-md-6" data-aos="zoom-out" data-aos-delay="500">
                                    <div class="feature-box d-flex align-items-center">
                                        <i class="bi bi-check"></i>
                                        <h3>Secure Login</h3>
                                    </div>
                                </div>

                                <div class="col-md-6" data-aos="zoom-out" data-aos-delay="600">
                                    <div class="feature-box d-flex align-items-center">
                                        <i class="bi bi-check"></i>
                                        <h3>Mobile Access</h3>
                                    </div>
                                </div>

                                <div class="col-md-6" data-aos="zoom-out" data-aos-delay="700">
                                    <div class="feature-box d-flex align-items-center">
                                        <i class="bi bi-check"></i>
                                        <h3>Seamless Integration</h3>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div class="row feture-tabs" data-aos="fade-up">
                        <div class="col-lg-6">
                            <h3>Effortless Attendance Management: Accurate, Secure, and Accessible Anytime, Anywhere</h3>


                            <ul class="nav nav-pills mb-3">
                                <li>
                                    <a class="nav-link active" data-bs-toggle="pill" href="#tab1">Precision</a>
                                </li>
                                <li>
                                    <a class="nav-link" data-bs-toggle="pill" href="#tab2">Secure</a>
                                </li>
                                <li>
                                    <a class="nav-link" data-bs-toggle="pill" href="#tab3">Automated Reporting</a>
                                </li>
                            </ul>
                            <div class="tab-content">

                                <div class="tab-pane fade show active" id="tab1">
                                    <p>we guarantee that each entry reflects the true attendance status, leaving no room for errors or discrepancies.</p>
                                    <div class="d-flex align-items-center mb-2">
                                        <i class="bi bi-check2"></i>
                                        <h4>Accurate and Reliable Tracking</h4>
                                    </div>
                                    <p>Our system is designed to ensure the accuracy and reliability of every attendance record. Through meticulous tracking and monitoring, we guarantee that each entry reflects the true attendance status.</p>
                                    <div class="d-flex align-items-center mb-2">
                                        <i class="bi bi-check2"></i>
                                        <h4>Elimination of Errors and Discrepancies</h4>
                                    </div>
                                    <p>We employ advanced algorithms and validation techniques to eliminate any potential errors or discrepancies in attendance records. By enforcing strict data integrity measures, we maintain the highest standards of precision, making your record-keeping process seamless and trustworthy..</p>
                                </div>

                                <div class="tab-pane fade show" id="tab2">
                                    <p>We prioritize the security and privacy of your information. Utilizing advanced security measures, our platform safeguards personal data, ensuring that all user information remains confidential and protected against unauthorized access..</p>
                                    <div class="d-flex align-items-center mb-2">
                                        <i class="bi bi-check2"></i>
                                        <h4>Real-Time Updates</h4>
                                    </div>
                                    <p>Stay informed with real-time updates on attendance records. Our system ensures that changes made to attendance status are reflected instantly across all devices, keeping users up-to-date with the latest information, and facilitating timely decision-making..</p>
                                    <div class="d-flex align-items-center mb-2">
                                        <i class="bi bi-check2"></i>
                                        <h4>Cross-Device Compatibility</h4>
                                    </div>
                                    <p>Access your attendance records seamlessly across various devices, including computers, tablets, and smartphones. Our platform adapts to different screen sizes and operating systems, providing a consistent user experience regardless of the device used, maximizing convenience and accessibility..</p>
                                </div>

                                <div class="tab-pane fade show" id="tab3">
                                    <p>Our system generates comprehensive reports automatically, providing instant insights into attendance patterns. This feature saves time and effort, allowing users to access valuable information without manual data compilation.</p>
                                    <div class="d-flex align-items-center mb-2">
                                        <i class="bi bi-check2"></i>
                                        <h4>Customizable Report Formats</h4>
                                    </div>
                                    <p>Tailor reports to your specific requirements with customizable formatting options. Whether you need summaries, detailed breakdowns, or graphical representations, our platform allows you to create reports that suit your preferences and facilitate informed decision-making.</p>
                                    <div class="d-flex align-items-center mb-2">
                                        <i class="bi bi-check2"></i>
                                        <h4>Scheduled Report Delivery</h4>
                                    </div>
                                    <p>Set up automated schedules for report generation and delivery. By scheduling reports to be generated and sent at predefined intervals, our system ensures that you receive timely updates on attendance data, enabling proactive management and analysis.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <img src={feature2} class="img-fluid" alt="" />
                        </div>
                    </div>
                </div>
            </section>


            <section id="pricing" className="pricing">
            <div className="container" data-aos="fade-up">
                <header className="section-header">
                    <h2>Pricing</h2>
                    <p>Check our Pricing</p>
                </header>
                <div className="row gy-4" data-aos="fade-left">
                    <div className="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-delay="100">
                        <div className="box">
                            <h3 style={{ color: "#07d5c0" }}>Free Plan</h3>
                            <div className="price"><sup>Rs</sup>0<span>/ mo</span></div>
                            <img src="pricing.png" className="img-fluid" alt="" />
                            <ul>
                                <li>Basic Attendance Tracking</li>
                                <li>Limited User Accounts</li>
                                <li>Essential Reporting</li>
                                <li>Email support</li>
                                <li className="na">Enhanced Attendance Tracking</li>
                            </ul>
                            <button className="btn-buy" onClick={() => handlePlanSelect('Free Plan', 0)}>Buy Now</button>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-delay="200">
                        <div className="box">
                            <span className="featured">Featured</span>
                            <h3 style={{ color: "#65c600" }}>Starter Plan</h3>
                            <div className="price"><sup>Rs</sup>3000<span> / mo</span></div>
                            <img src="pricingstarter.png" className="img-fluid" alt="" />
                            <ul>
                                <li>Increased User Accounts</li>
                                <li>Enhanced Attendance Tracking</li>
                                <li>Basic Customization Options</li>
                                <li>Priority Email Support</li>
                                <li className="na">Advanced Attendance Tracking</li>
                            </ul>
                            <button className="btn-buy" onClick={() => handlePlanSelect('Starter Plan', 3000)}>Buy Now</button>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-delay="300">
                        <div className="box">
                            <h3 style={{ color: "#ff901c" }}>Business Plan</h3>
                            <div className="price"><sup>Rs</sup>4500<span> / mo</span></div>
                            <img src="pricingbusiness.png" className="img-fluid" alt="" />
                            <ul>
                                <li>Advanced Attendance Tracking</li>
                                <li>Unlimited User Accounts</li>
                                <li>Custom Reporting Options</li>
                                <li>24/7 Customer Support</li>
                                <li>Dedicated Account Manager</li>
                            </ul>
                            <button className="btn-buy" onClick={() => handlePlanSelect('Business Plan', 4500)}>Buy Now</button>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-delay="400">
                        <div className="box">
                            <h3 style={{ color: "#ff0071" }}>Ultimate Plan</h3>
                            <div className="price"><sup>Rs</sup>6000<span> / mo</span></div>
                            <img src="pricingultimate.png" className="img-fluid" alt="" />
                            <ul>
                                <li>Premium Attendance Tracking</li>
                                <li>Priority Support with Dedicated Hotline</li>
                                <li>Customizable Dashboard</li>
                                <li>Advanced Analytics and Insights</li>
                            </ul>
                            <button  className="btn-buy" onClick={() =>  handlePlanSelect('Ultimate Plan', 6000)}>Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>



            <section id="team" class="team">

                <div class="container" data-aos="fade-up">

                    <header class="section-header">
                        <h2>Team</h2>
                        <p>Our hard working team</p>
                    </header>

                    <div class="row gy-4">

                        <div class="col-lg-3 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="100">
                            <div class="member">
                                <div class="member-img">
                                    <img src={Team1} class="img-fluid" alt="" />
                                    <div class="social">
                                        <a href=""><i class="bi bi-twitter"></i></a>
                                        <a href=""><i class="bi bi-facebook"></i></a>
                                        <a href=""><i class="bi bi-instagram"></i></a>
                                        <a href=""><i class="bi bi-linkedin"></i></a>
                                    </div>
                                </div>
                                <div class="member-info">
                                    <h4>Ravi Sharma</h4>
                                    <span>Chief Executive Officer</span>
                                    <p>"Leadership is not about being in charge. It is about taking care of those in your charge."</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="200">
                            <div class="member">
                                <div class="member-img">
                                    <img src={Team2} class="img-fluid" alt="" />
                                    <div class="social">
                                        <a href=""><i class="bi bi-twitter"></i></a>
                                        <a href=""><i class="bi bi-facebook"></i></a>
                                        <a href=""><i class="bi bi-instagram"></i></a>
                                        <a href=""><i class="bi bi-linkedin"></i></a>
                                    </div>
                                </div>
                                <div class="member-info">
                                    <h4>Priya Verma</h4>
                                    <span>Product Manager</span>
                                    <p>"Innovation is seeing what everybody has seen and thinking what nobody has thought."</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="300">
                            <div class="member">
                                <div class="member-img">
                                    <img src={Team3} class="img-fluid" alt="" />
                                    <div class="social">
                                        <a href=""><i class="bi bi-twitter"></i></a>
                                        <a href=""><i class="bi bi-facebook"></i></a>
                                        <a href=""><i class="bi bi-instagram"></i></a>
                                        <a href=""><i class="bi bi-linkedin"></i></a>
                                    </div>
                                </div>
                                <div class="member-info">
                                    <h4>Arjun Patel</h4>
                                    <span>CTO</span>
                                    <p>"Technology is best when it brings people together."</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="400">
                            <div class="member">
                                <div class="member-img">
                                    <img src={Team4} class="img-fluid" alt="" />
                                    <div class="social">
                                        <a href=""><i class="bi bi-twitter"></i></a>
                                        <a href=""><i class="bi bi-facebook"></i></a>
                                        <a href=""><i class="bi bi-instagram"></i></a>
                                        <a href=""><i class="bi bi-linkedin"></i></a>
                                    </div>
                                </div>
                                <div class="member-info">
                                    <h4>Asha Iyer</h4>
                                    <span>Accountant</span>
                                    <p>"A good accountant is a valuable asset, enabling informed financial decisions and sustainable growth."</p>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>

            </section>








            <section id="contact" class="contact">

                <div class="container" data-aos="fade-up">

                    <header class="section-header">
                        <h2>Contact</h2>
                        <p>Contact Us</p>
                    </header>

                    <div class="row gy-4">

                        <div class="col-lg-6">

                            <div class="row gy-4">
                                <div class="col-md-6">
                                    <div class="info-box">
                                        <i class="bi bi-geo-alt"></i>
                                        <h3>Address</h3>
                                        <p>Indiranagr, lucknow<br />Uttar pardesh</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="info-box">
                                        <i class="bi bi-telephone"></i>
                                        <h3>Call Us</h3>
                                        <p>+91 8340251638<br />+91 9507267971</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="info-box">
                                        <i class="bi bi-envelope"></i>
                                        <h3>Email Us</h3>
                                        <p>kumar_rahulkkcs@yahoo.com<br />rah0987654321@gmail.com</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="info-box">
                                        <i class="bi bi-clock"></i>
                                        <h3>Open Hours</h3>
                                        <p>Monday - Friday<br />9:00AM - 05:00PM</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="col-lg-6">
                            <form action="forms/contact.php" method="post" class="php-email-form">
                                <div class="row gy-4">

                                    <div class="col-md-6">
                                        <input type="text" name="name" class="form-control" placeholder="Your Name" required />
                                    </div>

                                    <div class="col-md-6 ">
                                        <input type="email" class="form-control" name="email" placeholder="Your Email" required />
                                    </div>

                                    <div class="col-md-12">
                                        <input type="text" class="form-control" name="subject" placeholder="Subject" required />
                                    </div>

                                    <div class="col-md-12">
                                        <textarea class="form-control" name="message" rows="6" placeholder="Message" required></textarea>
                                    </div>

                                    <div class="col-md-12 text-center">
                                        <div class="loading">Loading</div>
                                        <div class="error-message"></div>
                                        <div class="sent-message">Your message has been sent. Thank you!</div>

                                        <button type="submit">Send Message</button>
                                    </div>

                                </div>
                            </form>

                        </div>

                    </div>

                </div>

            </section>

            <main />



            <Footer />

        </>
    );
}

export default Home;
