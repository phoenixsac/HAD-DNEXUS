import React, { useState } from 'react';
import Navbar from '../components/Navbar/ConditionalNavbar';

import "./Style/AddFacility.css";
import Success from '../components/SuccesOrFailure/Success';
import Failure from '../components/SuccesOrFailure/Failure';

const AddFacility = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [facilityId, setfacilityId] = useState('');
  const [message, setMessage] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleVerify = async () => {
    try { 
      // Retrieve JWT token from local storage
      const token = localStorage.getItem('jwtToken');

      const response = await fetch(`http://localhost:8080/admin/add-facility?facilityId=${facilityId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}` // Include JWT token in the headers
        }
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data);
        setIsVerified(true);
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
      <div>
        <div className="lab-verification-container">          
          <div className='facilityId-field'>
            <input
              type="text"
              placeholder="Enter Unique Facility ID"
              value={facilityId}
              onChange={handleChange}
            />
          </div>
          <div className='verify-button'>
            <button onClick={handleVerify}>
              Verify
            </button>
          </div>

           {/* Render success/failure component based on isVerified */}
           {/* {showResult && (isVerified ? <Success message={message} /> : <Failure message={message} />)} */}
           <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default AddFacility;
