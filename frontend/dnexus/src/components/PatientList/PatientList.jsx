import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // For routing to patient cases

import "./PatientList.css"

const PatientList = ({ patients }) => {

  const userType = sessionStorage.getItem('userType');
  const navigate = useNavigate();

  const handlePatientClick = (patient) => {
    // Navigate to the dynamic route with patient details and userType as state
    navigate(generateDynamicRoute(userType, patient));
  };

  // Function to generate dynamic route based on user type
  const generateDynamicRoute = (userType, patient) => {
    const patientState = {
      id: patient.id,
      name: patient.name,
      age: patient.age,
      gender: patient.gender
      // Add other patient details as needed
    };

    console.log("patientState",patientState);

    switch (userType) {
      case 'doctor':
        return {
          pathname: `/doctor/patient-test-details/${patient.id}`,
          state: { patient : patientState }
        };
      case 'radiologist':
        return {
          pathname: `/rad/patient-test-details/${patient.id}`,
          state: { userType, patient }
        };
      case 'lab':
        return {
          pathname: `/lab/patient-test-details/${patient.id}`,
          state: { userType, patient }
        };
      default:
        return {
          pathname: `/patient-test-details/${patient.id}`,
          state: { userType, patient }
        };
    }
  };

  return (
    <div className="patient-list" >
      <div className="patient-card heading-bg">
        <div className="field">
          <p>Patient ID</p>
        </div>
        <div className="field">
          <p>Name</p>
        </div>
        <div className="field">
          <p>Gender</p>
        </div>
        <div className="field">
          <p>Age</p>
        </div>  
      </div>

      {patients.map((patient) => (
        <div 
          className='patient-card-link' 
          key={patient.id} 
          onClick={() => handlePatientClick(patient)}
        >  
          <div className="patient-card list-bg">
            <div className="field">
              <p>{patient.id}</p>
            </div>
            <div className="field">
              <p>{patient.name}</p>
            </div>
            <div className="field">
              <p>{patient.gender}</p>
            </div>
            <div className="field">
              <p>{patient.age}</p>
            </div>  
          </div>
        </div>
      ))}
    </div>
  );
};

export default PatientList;
