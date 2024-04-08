import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // For routing to patient cases

import "./PatientList.css"

const PatientList = ({ patients }) => {

  const userType = sessionStorage.getItem('userType');

  // Function to generate dynamic route based on user type
  const generateDynamicRoute = (userType, patientId) => {
    switch (userType) {
      case 'doctor':
        return `/doctor/patient-test-details/${patientId}`;
      case 'radiologist':
        return `/rad/patient-test-details/${patientId}`;
      case 'lab':
        return `/lab/patient-test-details/${patientId}`;
      default:
        return `/patient-test-details/${patientId}`;
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
        <Link className='patient-card-link' 
        key={patient.id} 
        to={generateDynamicRoute(userType, patient.id)}
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

      </Link>
      ))}
    </div>
  );
};

export default PatientList;
