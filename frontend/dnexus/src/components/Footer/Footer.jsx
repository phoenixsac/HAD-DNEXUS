import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Footer.css"

import { FaCaretRight } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";

const Footer = () => {

  return (
    <div className="footer-container">
      {/* <!-- Footer Area --> */}
		<footer id="footer" className="footer ">
			{/* <!-- Footer Top --> */}
			<div className="footer-top">
				<div className="footer-container">
					<div className="footer-row">
						<div className="footer-row-col">
							<div className="single-footer">
								<h2>About Us</h2>
								<p>Lorem ipsum dolor sit am consectetur adipisicing elit do eiusmod <br/> tempor incididunt ut labore dolore magna.</p>
								{/* <!-- Social --> */}
								<ul className="social">
									<li><a href="#"><i className="icofont-facebook"></i></a></li>
									<li><a href="#"><i className="icofont-google-plus"></i></a></li>
									<li><a href="#"><i className="icofont-twitter"></i></a></li>
									<li><a href="#"><i className="icofont-vimeo"></i></a></li>
									<li><a href="#"><i className="icofont-pinterest"></i></a></li>
								</ul>
								{/* <!-- End Social --> */}
							</div>
						</div>
						<div className="footer-row-col">
							<div className="single-footer f-link">
								<h2>Quick Links</h2>
								<div className="links">
									<div className="footer-row-col"> 
										<ul>
											<li><a href="#"><div className="icon-link"><FaCaretRight /> Home</div></a></li>
											<li><a href="#"><div className="icon-link"><FaCaretRight /> About Us</div></a></li>
											{/* <li><a href="#"><i className="fa fa-caret-right" aria-hidden="true"></i>Services</a></li> */}
											<li><a href="#"><div className="icon-link"><FaCaretRight /> Privacy Policy</div></a></li>
											<li><a href="#"><div className="icon-link"><FaCaretRight /> Contact Us</div></a></li>	
										</ul>
									</div>
								</div>
							</div>
						</div>
						{/* <div className="footer-row-col">
							<div className="single-footer">
								<h2>Open Hours</h2>
								<p>Lorem ipsum dolor sit ame consectetur adipisicing elit do eiusmod tempor incididunt.</p>
								<ul className="time-sidual">
									<li className="day">Monday - Fridayp <span>8.00-20.00</span></li>
									<li className="day">Saturday <span>9.00-18.30</span></li>
									<li className="day">Monday - Thusday <span>9.00-15.00</span></li>
								</ul>
							</div>
						</div> */}
						{/* <div className="footer-row-col">
							<div className="single-footer">
								<h2>Newsletter</h2>
								<p>subscribe to our newsletter to get allour news in your inbox.. Lorem ipsum dolor sit amet, consectetur adipisicing elit,</p>
								<form action="mail/mail.php" method="get" target="_blank" className="newsletter-inner">
									<input name="email" placeholder="Email Address" className="common-input" onfocus="this.placeholder = ''"
										onblur="this.placeholder = 'Your email address'" required="" type="email"/>
									<button className="button"><i className="icofont icofont-paper-plane"></i></button>
								</form>
							</div>
						</div> */}
					</div>
				</div>
			</div>
			{/* <!--/ End Footer Top --> */}
			{/* <!-- Copyright --> */}
			<div className="copyright">
				<div className="copy-container">
					<div className="row">
						<div className="col-lg-12 col-md-12 col-12">
							<div className="copyright-content">
								<p>© Copyright 2024  |  All Rights Reserved by <a href="" target="_blank">DNexus</a> </p>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <!--/ End Copyright --> */}
		</footer>
		{/* <!--/ End Footer Area --> */}
    </div>
  );
};

export default Footer;