import React from "react";
import ConditionalNavbar from "../components/Navbar/ConditionalNavbar";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'icofont/icofont.min.css';
import MySlider from "../components/Sliderr/Sliderr";
import Funfact from "../components/FunFacts/FunFacts";
import sectionImg from '../components/assets/StockImages/section-img.png';
import contactImg from '../components/assets/StockImages/contact-img.png';

import Footer from "../components/Footer/Footer";
// import { useNavigate } from "react-router-dom";

import "./Style/LandingPage.css";

function LandingPage() {

  //const navigate = useNavigate();
  return (
    <div>
      <ConditionalNavbar />

      {/* <MySlider/> */}
      {/* <!-- Slider Area --> */}
      <section className="slider">
        <div className="hero-slider">
          {/* <!-- Start Single Slider --> */}
          <div className="single-slider" style={{backgroundImage: `url(${require('../components/assets/StockImages/slider3.jpg')})`}}>
            <div className="landing-container">
              <div className="row">
                <div className="col-lg-7">
                  <div className="text">
                    <h1>Bridging <span>Expertise</span> <br/> Empowering <span>Healthcare!</span></h1>
                    <p>Empowering Precision Healthcare Through Seamless Collaboration and Data-Driven Insights! </p>
                  </div>
                </div>
              </div>
            </div>
          </div>			
          {/* <!-- End Single Slider --> */}
        </div>
      </section>
      {/* <!--/ End Slider Area --> */}

      <Funfact/>

      <div className="appointment">

        <div className="image">
          <img src={contactImg} alt="#" />
        </div>

        <div className="text">
          <div className="section-title">
              <h2>Revolutionizing Healthcare Collaboration: Connect, Collaborate, and Care with Confidence!</h2>
              <img src={sectionImg} alt="#" />
              <br/>
              <p style={{ padding: '25px' }}>Our platform empowers healthcare providers to efficiently create and manage cases for diagnostic tests, ensuring streamlined workflows and accurate data management. From uploading test results to accessing DICOM images, our platform offers a comprehensive solution for medical professionals.
                        With our secure environment, radiologists and doctors can securely view DICOM images, analyze results, and collaborate in real-time discussions. Our platform prioritizes privacy and security, ensuring that patient data remains protected at all times.
                        Experience the future of healthcare collaboration with DNexus, where innovation meets security for enhanced patient care.
              </p>
          </div>

        </div>

      </div>

      <Footer/>
      
    </div>
  );
}

export default LandingPage;
