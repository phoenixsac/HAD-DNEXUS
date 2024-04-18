import React, { useState } from 'react';
import axios from 'axios';

import "./Style/AddProfessional.css"

import Navbar from '../components/Navbar/ConditionalNavbar'
import SuccessComponent from '../components/SuccesOrFailure/Success';
import FailureComponent from '../components/SuccesOrFailure/Failure';

const AddProfessional = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [hpId, sethpId] = useState(''); 
  const [message, setMessage] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleVerify = async () => {
    try {
      const hpIdNumber = parseInt(hpId); // Convert input value to number
      
      // Retrieve JWT token from local storage
      const token = localStorage.getItem('jwtToken');

      const response = await fetch(`http://localhost:8080/admin/add-professional?hpId=${hpIdNumber}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include JWT token in the headers
        }
      });

      if (response.ok) {
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
      sethpId('');
      setShowResult(true); // Show the result after receiving the response
    } catch (error) {
      console.error('Error occurred during verification:', error);
      setMessage('An error occurred during verification');
      setIsVerified(false);
      setShowResult(true); // Show the result even if there's an error
    }
  };

  const handleChange = (event) => {
    sethpId(event.target.value);
  };

  return (
    <div>
      <Navbar/>
      <div>
        <div className="professional-verification-container">          
          <div className='hpId-field'>
            <input
                type="text" // Change type to number for long integer input
                placeholder="Enter Unique Professional ID"
                value={hpId}
                onChange={handleChange}
            />
          </div>
          <div className='verify-button'>
            <button onClick={handleVerify}>
                Verify
            </button>
          </div>

          {/* Render success/failure component based on isVerified */}
          {showResult && (isVerified ? <SuccessComponent message={message} /> : <FailureComponent message={message} />)}
          {/* <p>Added Successfully</p> */}
          {/* Render the message paragraph based on isVerified */}
          {/* {showResult && <p>{message}</p>} */}
          
        </div>
      </div>
    </div>
  );
};

// Define SuccessComponent and FailureComponent as per your requirement

export default AddProfessional;





