import React from 'react';
import './Style/ContactUs.css';
import Navbar from '../components/Navbar/ConditionalNavbar';
import Footer from '../components/Footer/Footer';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';

const ContactUs = () => {
  return (
    <div>
    <Navbar/>
    <Breadcrumbs pageTitle="Contact Us" />
    <div className="contact-us ">
      {/* <h2>Contact Us</h2> */}
      <div className="contact-info side">
        <div className="location ">
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.9738555004324!2d77.66064127454469!3d12.844965117643163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae135aeb7f340f%3A0x3ad86af40d2ac611!2sInternational%20Institute%20of%20Information%20Technology%2C%20Bangalore!5e0!3m2!1sen!2sin!4v1714495168965!5m2!1sen!2sin"
            width="600"
            height="500"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Location"
          ></iframe>
        </div>
        <div className="contact-details">
          <div className="phone">
            <h3>Phone:+91 8149734360 </h3>
            
          </div>
          <div className="phone">
            <h3>Email: Sachin.nair@iiitb.ac.in</h3>
            
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
}

export default ContactUs;
