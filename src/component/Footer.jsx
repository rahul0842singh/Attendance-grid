import React from 'react'
import logo from "../images/logo.png";

const Footer = () => {
    return (
        <>
            <footer id="footer" class="footer">

                <div class="footer-newsletter">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-12 text-center">
                                <h4>Our Newsletter</h4>
                                <p>Track Every Minute, Perfect Every Attendance</p>
                            </div>
                            <div class="col-lg-6">
                                <form action="" method="post">
                                    <input type="email" name="email" /><input type="submit" value="Subscribe" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="footer-top">
                    <div class="container">
                        <div class="row gy-4">
                            <div class="col-lg-5 col-md-12 footer-info">
                                <a href="index.html" class="logo d-flex align-items-center">
                                    <img src={logo} alt="" />

                                </a>
                                <p>we guarantee that each entry reflects the true attendance status, leaving no room for errors or discrepancies..</p>
                                <div class="social-links mt-3">
                                    <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
                                    <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
                                    <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
                                    <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
                                </div>
                            </div>

                            <div class="col-lg-2 col-6 footer-links">
                                <h4>Useful Links</h4>
                                <ul>
                                    <li><i class="bi bi-chevron-right"></i> <a href="#">Home</a></li>
                                    <li><i class="bi bi-chevron-right"></i> <a href="#">About us</a></li>
                                    <li><i class="bi bi-chevron-right"></i> <a href="#">Services</a></li>
                                    <li><i class="bi bi-chevron-right"></i> <a href="#">Terms of service</a></li>
                                    <li><i class="bi bi-chevron-right"></i> <a href="#">Privacy policy</a></li>
                                </ul>
                            </div>

                            <div class="col-lg-2 col-6 footer-links">
                                <h4>Our Services</h4>
                                <ul>
                                    <li><i class="bi bi-chevron-right"></i> <a href="#">Daily Tracking system</a></li>
                                    <li><i class="bi bi-chevron-right"></i> <a href="#">Holidays Track</a></li>
                                    <li><i class="bi bi-chevron-right"></i> <a href="#">Weekly management</a></li>
                                    <li><i class="bi bi-chevron-right"></i> <a href="#">Marketing</a></li>
                                    <li><i class="bi bi-chevron-right"></i> <a href="#">Graphic Design</a></li>
                                </ul>
                            </div>

                            <div class="col-lg-3 col-md-12 footer-contact text-center text-md-start">
                                <h4>Contact Us</h4>
                                <p>
                                    Indiranagar <br />
                                    Lucknow<br />
                                    Uttar Pradesh <br /><br />
                                    <strong>Phone:</strong> +91 8340251638<br />
                                    <strong>Email:</strong> Kumar_rahulkkcs@yahoo.com<br />
                                </p>

                            </div>

                        </div>
                    </div>
                </div>

                <div class="container">
                    <div class="copyright">
                        &copy; Copyright <strong><span>Grid</span></strong>. All Rights Reserved
                    </div>
                    <div class="credits">

                        Designed by <a href="#">Rahul singh</a>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer