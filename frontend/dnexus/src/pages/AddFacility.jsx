import React, { useState } from 'react';
import Navbar from '../components/Navbar/ConditionalNavbar';

import "./Style/AddFacility.css";
import contactImg from '../components/assets/StockImages/contact-img.png';

import Success from '../components/SuccesOrFailure/Success';
import Failure from '../components/SuccesOrFailure/Failure';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Footer from '../components/Footer/Footer';

const AddFacility = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [facilityId, setfacilityId] = useState('');
  const [message, setMessage] = useState('');
  const [showResult, setShowResult] = useState(false);

  const baseUrl = "http://localhost:8080/";

  const handleVerify = async () => {
    try { 
      // Retrieve JWT token from local storage
      const token = localStorage.getItem('jwtToken');

      const response = await fetch(`${baseUrl}admin/add-facility?facilityId=${facilityId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}` // Include JWT token in the headers
        }
      });

      if (response.ok) {
        // const data = await response.json();
        // setMessage(data);
        // setIsVerified(true);
        console.log("response:",response.data);

        const data = await response.text();

        console.log("data:",data);
        console.log("data:",data);

        // setMessage(data.message);
        // // setMessage("Added Successfully");
        // setIsVerified(true);

        if (data === "Success") {
          setMessage("Added Successfully");
          setIsVerified(true);
        } else {
          setIsVerified(false);
          setMessage(data);
        }

        console.log("data:",data);
        console.log("isVerified:",isVerified);
      } else {
        setIsVerified(false);
        setMessage('Failed to verify. Please try again.');
      }

      // Clear input field after displaying message
      setfacilityId('');
      setShowResult(true); // Show the result after receiving the response
    } catch (error) {
      console.error('Error occurred during verification:', error);
      setMessage('An error occurred during verification');
      setIsVerified(false);
      setShowResult(true); // Show the result even if there's an error
    }
  };

  const handleChange = (event) => {
    setfacilityId(event.target.value);
  };

  return (
    <div>
      <Navbar/>

      <Breadcrumbs pageTitle="Add Facility"/>

      <div>
        <div className="lab-verification-container">          
          <div className="facility">
            <div className='facilityId-field'>
              <input
                type="text"
                placeholder="Enter Unique Facility ID"
                value={facilityId}
                onChange={handleChange}
              />
            
              <div className='verify-button'>
                <button onClick={handleVerify}>
                  Verify
                </button>
              </div>

              <div>
                {showResult && (isVerified ? <Success message={message} /> : <Failure message={message} />)}
              </div>

            </div>

            <div className='image'>
                <img src={contactImg} alt="#" />
            </div>
          </div>

           {/* Render success/failure component based on isVerified */}
           {/* {showResult && (isVerified ? <Success message={message} /> : <Failure message={message} />)} */}
           
        </div>
      </div>

      <Footer/>

    </div>
  );
};

export default AddFacility;
