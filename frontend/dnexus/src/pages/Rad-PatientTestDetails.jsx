import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // For retrieving patient ID from URL

import PatientTestItem from '../components/PatientTestItem/PatientTestItem';

import "./Style/PatientTestDetails.css";
import Navbar from '../components/Navbar/ConditionalNavbar';

const DocPatientTestDetails = () => {

  const navigate = useNavigate();

//   const [patient, setPatient] = useState(null);
//   const [tests, setTests] = useState([]);
//   const { patientId } = useParams(); // Get patient ID from URL parameter

//   // Fetch patient details and tests from backend (replace with your logic)
//   useEffect(() => {
//     const fetchPatientData = async () => {
//       const response = await fetch(`/api/patients/${patientId}`); // Replace with your endpoint
//       const data = await response.json();
//       setPatient(data.patient);
//       setTests(data.tests);
//     };

//     if (patientId) { // Fetch data only if patientId exists
//       fetchPatientData();
//     }
//   }, [patientId]);

//DUMMY
const [patient, setPatient] = useState({
    id: 123,
    name: 'John Doe',
    age: 35,
    gender: 'Male',
  });

  const [tests, setTests] = useState([
    {
      id: 123,
      date: "12/03/2024",
      name: 'Blood Test',
      status: 'completed',
      description: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      id: 234,
      date: "12/03/2024",
      name: 'X-ray',
      status: 'ongoing',
      description: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      id: 345,
      date: "12/03/2024",
      name: 'MRI Scan',
      status: 'upcoming',
      description: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
  ]);

  const handleTestClick = (testId) => {
    // Handle navigation to test details page with test ID (implementation depends on your routing)
    console.log(`Navigate to test details page for test ID: ${testId}`);
  };

  const handleCreateCase = () => {
    navigate('/rad/dashboard/');
  }

  // Access patient details from state
  const { id, name, age, gender } = patient || {}; // Destructuring with default values

  return (
    <div>

      <Navbar/>

      <div className="patient-test-details">

        <div className='header'>
          <div className='patient-data'>
            <p>{id}</p>
            <p>{name}</p>
            <p>{age} / {gender}</p>
          </div>

          <div className='create-button'>
            <button onClick={handleCreateCase}>Go Back</button>
          </div>
        </div>

        <div className="test-list">
          {tests.map((test) => (
            <PatientTestItem key={test.id} test={test} onTestClick={handleTestClick} />
          ))}
        </div>
        
      </div>

    </div>
  );
};

export default DocPatientTestDetails;


