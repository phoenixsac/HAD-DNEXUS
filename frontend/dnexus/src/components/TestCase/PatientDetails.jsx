import "./PatientDetails.css";

import React, { useState, useEffect } from 'react';

function PatientDetails() {
  const [patientData, setPatientData] = useState(null);

  // Fetch patient details from backend API
  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const consultationId = 2; // Set consultationId param for now
        const response = await fetch(`http://localhost:8085/core/consultation/patient-details?consultationId=${consultationId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch patient details');
        }
        const data = await response.json();
        setPatientData(data);
      } catch (error) {
        console.error('Error fetching patient details:', error);
        // Handle error as needed
      }
    };

    fetchPatientDetails();
  }, []); // Empty dependency array ensures the effect runs only once

  // Render patient details
  return (
    <div className="patient-banner">
      {patientData ? (
        <>
          <div className="patient-info">
            <span className="patient-id">Patient ID: {patientData.id}</span>
            <span className="patient-name">Patient Name: {patientData.name}</span>
            <span className="age-gender">Age/Gender: {patientData.age}/{patientData.gender}</span>
          </div>
          <div className="patient-details">
            <span className="patient-address">Blood Group: {patientData.bloodGroup}</span>
            <span className="patient-phone">Phone: {patientData.contact}</span>
            <span className="email">Email: {patientData.email}</span>
            
            {/* Include other patient details here */}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PatientDetails;




