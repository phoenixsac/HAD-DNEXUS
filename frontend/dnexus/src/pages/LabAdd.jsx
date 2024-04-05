import React, { useState } from 'react';
import Navbar from '../components/Navbar/ConditionalNavbar';

const DoctorAdd = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [upid, setUpid] = useState('');
  const [message, setMessage] = useState('');

  // const handleVerify = async () => {
  //   const response = await fetch('/api/verify-doctor', {
  //     method: 'POST',
  //     body: JSON.stringify({ upid }),
  //   });

  //dummy
  const doctorData = {
    "123456": "Doctor John Doe", // Valid UPID with doctor details
    "987654": "Doctor Already Added" // Existing UPID message
  };
  const handleVerify = () => {
    const verificationResult = doctorData[upid];

    if (!verificationResult) {
      setMessage('Invalid UPID');
      setIsVerified(false);
    } else if (verificationResult === 'Doctor Already Added') {
      setMessage(verificationResult);
      setIsVerified(false);
    } else {
      setMessage('Doctor added successfully.');
      setIsVerified(true);
    }
  

    // const data = await response.json();
    // setMessage(data.message);
    // setIsVerified(data.isVerified);

        // Clear input fieldafter displaying message
        setUpid('');
  };

  const handleChange = (event) => {
    setUpid(event.target.value);
  };

  return (
    <div>
      <Navbar/>
      <div>
        <div className="lab-verification-container">          
          <div className='ufid-field'>
            <input
                type="text"
                placeholder="Enter Unique Facility ID"
                value={upid}
                onChange={handleChange}
            />
          </div>
          <div className='verify-button'>
            <button onClick={handleVerify}>
                Verify
            </button>
          </div>

          {/* replace with success/failure componentS */}
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorAdd;