import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientList from '../components/PatientList/PatientList';
import Pagination from '../components/Pagination/Pagination'; 
import Navbar from "../components/Navbar/ConditionalNavbar"

import "./Style/DoctorDashboard.css"

const DoctorDashboard = () => {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const [patientsPerPage] = useState(3);


  // Fetch patient data from backend (replace with your actual API call)
//   useEffect(() => {
//     const fetchPatients = async () => {
//       const response = await fetch('/api/patients'); // Replace with your API endpoint
//       const data = await response.json();
//       setPatients(data);
//     };

//     fetchPatients();
//   }, []);


//dummy
useEffect(() => {
    const patientData = [
      // Sample patient data objects
      { id: 123, name: 'John Doe', gender: 'Male', age: 30 },
      { id: 234, name: 'Mary Poppins', gender: 'Female', age: 10 },
      { id: 345, name: 'Dory Nemo', gender: 'Female', age: 25 },
      { id: 456, name: 'Alexander', gender: 'Male', age: 32 },
      // ... more patients
    ];
    setPatients(patientData);
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase()); // Ensure case-insensitive search
  };

  const handleBack = () => {
    navigate("/doctor/dashboard");
  }

  const filteredPatients = patients.filter((patient) => {
    if (!searchTerm) return true; // Show all patients if no search term

    // search logic to filter by ID, name, gender, or age (case-insensitive)
    return (
      patient.id.toString().includes(searchTerm) ||
      patient.name.toLowerCase().includes(searchTerm) ||
      patient.gender.toLowerCase().includes(searchTerm) ||
      patient.age.toString().includes(searchTerm)
    );
  });

  // Change page handler for Pagination component
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);

  return (
    <div>
      <Navbar/>

        <div className='doctor-container'>

          <div className='search-back'>

            <div className='search-field'>
              <input
                type="text"
                placeholder="Search by ID, Name, Gender, or Age"
                value={searchTerm}
                    onChange={handleSearchChange}
              />
            </div>

            <div>
              <button onClick={handleBack}>Back</button>
            </div> 

          </div>

          <div className="doctor-dashboard">
            <PatientList patients={filteredPatients} />
          </div>

          <div>
            <Pagination
              patientsPerPage={patientsPerPage}
              totalPatients={filteredPatients.length} 
              paginate={paginate}
            />
          </div>

        </div>

    </div>
  );
};

export default DoctorDashboard;
