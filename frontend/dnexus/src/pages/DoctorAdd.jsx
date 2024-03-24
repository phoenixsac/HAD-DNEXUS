import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar/ConditionalNavbar"

function DoctorRegistrationForm() {
  const [uniqueRegistrationNumber, setUniqueRegistrationNumber] = useState('');
  const [isRegistrationNumberValid, setIsRegistrationNumberValid] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false);

  const handleVerifyRegistrationNumber = async () => {
    // Send an API request to verify the registration number
    const response = await fetch('/api/verify-registration-number', {
      method: 'POST',
      body: JSON.stringify({ uniqueRegistrationNumber }),
    });

    const data = await response.json();

    if (data.isValid) {
      setIsRegistrationNumberValid(true);
      setVerificationMessage('Registration number is valid');
    } else {
      setIsRegistrationNumberValid(false);
      setVerificationMessage('Registration number is invalid');
    }
  };

  const handleGetOtp = async () => {
    // Send an API request to get OTP
    const response = await fetch('/api/send-otp', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    console.log('OTP sent:', data.otp); // Remove this line in production
  };

  const handleVerifyOtp = async () => {
    // Send an API request to verify OTP
    const response = await fetch('/api/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();

    if (data.isValid) {
      setIsAddButtonEnabled(true);
    } else {
      console.error('Invalid OTP');
    }
  };

  const handleAddDoctor = async () => {
    // Send an API request to add doctor with auto-generated username and password
    const response = await fetch('/api/add-doctor', {
      method: 'POST',
      body: JSON.stringify({ fullName, age, gender, specialization, phoneNumber, email }),
    });

    const data = await response.json();

    console.log('Doctor added:', data); // Remove this line in production

    // Navigate to doctor success page with auto-generated username and password
  };

  return (
    <div>
        <Navbar/>
        <div className="registration-form">
            <h2>Registration Form</h2>

            <div className="registration-number-section">
                <label htmlFor="uniqueRegistrationNumber">Unique Registration Number</label>
                <input
                type="text"
                id="uniqueRegistrationNumber"
                value={uniqueRegistrationNumber}
                onChange={(e) => setUniqueRegistrationNumber(e.target.value)}
                />
                <button onClick={handleVerifyRegistrationNumber}>Verify</button>
                {verificationMessage && (
                <span className={isRegistrationNumberValid ? 'success' : 'error'}>{verificationMessage}</span>
                )}
            </div>

            {isRegistrationNumberValid && (
                <>
                <div className="doctor-details-section">
                        <label htmlFor="fullName">Full Name</label>
                        <input type="text" id="fullName" value={fullName} required onChange={(e) => setFullName(e.target.value)} />

                        <label htmlFor="age">Age</label>
                        <input type="number" id="age" value={age} required onChange={(e) => setAge(e.target.value)} />

                        <label htmlFor="gender">Gender</label>
                        <div className="gender-radio-buttons">
                        <input
                            type="radio"
                            id="male"
                            value="male"
                            checked={gender === 'male'}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        <label htmlFor="male">Male</label>
                        <input
                            type="radio"
                            id="female"
                            value="female"
                            checked={gender === 'female'}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        <label htmlFor="female">Female</label>
                        </div>

                        <label htmlFor="specialization">Specialization</label>
                        <input
                            type="text"
                            id="specialization"
                            value={specialization}
                            onChange={(e) => setSpecialization(e.target.value)}
                            required
                        />

                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />

                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <button onClick={handleGetOtp} disabled={email === ''}>Get OTP</button>
                        <input
                            type="text"
                            id="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            disabled={!isRegistrationNumberValid}
                        />

                        <button onClick={handleVerifyOtp} disabled={!isRegistrationNumberValid || otp === ''}>
                            Verify OTP
                        </button>
                    </div>
                </>
                )}

                <button to={"/success-page"} onClick={handleAddDoctor} disabled={!isAddButtonEnabled}>
                    Add Doctor
                </button>
        </div>
    </div>

    );}

    export default DoctorRegistrationForm;

