
import React from 'react';
import './Style/AboutUs.css';
import Navbar from '../components/Navbar/ConditionalNavbar';
import Footer from '../components/Footer/Footer';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';

const AboutUs = () => {
    return (
        <div>
        <Navbar/>
        <Breadcrumbs pageTitle="About Us" />
        <div className="about-us-container">
        <div className="about-us-content">
    {/* <h2>About Us</h2> */}
    <p>
        Welcome to our project website! We are a team of passionate students from the International Institute of Information Technology Bangalore (IIITB), embarking on an exciting journey to develop a project as part of our coursework.
    </p>
    <p>
        At IIITB, we strive to push the boundaries of knowledge and innovation in the field of Information Technology. Our mission is to leverage cutting-edge technologies and methodologies to address real-world challenges and make a positive impact on society.
    </p>
    <p>
        Our project is an integral part of our academic curriculum, designed to enhance our practical skills and knowledge in software development, data analysis, and project management. Through this project, we aim to apply the theoretical concepts we've learned in class to solve practical problems and create innovative solutions.
    </p>
    <p>
        We are a diverse team of students with backgrounds in computer science, engineering, and related fields. Each team member brings unique skills, perspectives, and experiences to the table, contributing to the success of our project.
    </p>

    <p>
        Thank you for visiting our website and supporting our project!
    </p>
</div>
        </div>
        <Footer/>
        </div>
    );
}

export default AboutUs;
