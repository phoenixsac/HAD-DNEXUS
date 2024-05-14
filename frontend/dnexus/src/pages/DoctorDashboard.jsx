import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/Authentication/AuthContext';

import PatientList from '../components/PatientList/PatientList';
import Pagination from '../components/Pagination/Pagination'; 

import "./Style/DoctorDashboard.css"
import Navbar from '../components/Navbar/ConditionalNavbar';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Footer from '../components/Footer/Footer';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { actorId } = useContext(AuthContext);

  // Initialize actorId state with value from local storage or context
  const [actorIdState, setActorIdState] = useState(actorId || localStorage.getItem('actorId'));
  console.log("actorIdState:", actorIdState);

  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const [patientsPerPage] = useState(6);

  useEffect(() => {
    // Check if actorId is available and not null
    if (actorId) {
      setActorIdState(actorId);
      localStorage.setItem('actorId', actorId);
    }
  }, [actorId]);

  useEffect(() => {
    // Fetch patients only if actorIdState is available and not null
    if (actorIdState) {
      const fetchPatients = async () => {
        try {
          const userType = sessionStorage.getItem('userType');
          const jwtToken = localStorage.getItem('jwtToken');

          if (!userType || !jwtToken) {
            throw new Error('User type or token not found.');
          }

          const response = await fetch(`http://localhost:8085/core/professional/patient-card-detail-list?docProffId=${actorIdState}`, {
            headers: {
              'Content-Type': 'application/json',
              // 'Authorization': `Bearer ${jwtToken}`
            },
            method: 'GET',
            // body: JSON.stringify({ userType }) // Send userType with the request
          });

          if (!response.ok) {
            throw new Error('Failed to fetch patient data.');
          }

          const data = await response.json();
          setPatients(data);
          
        } catch (error) {
          console.error('Error fetching patients:', error);
          // Handle error (e.g., show error message)
        }
      };

      fetchPatients();
    }
  }, [actorIdState]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase()); // Ensure case-insensitive search
  };

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

      <Breadcrumbs pageTitle="Doctor Dashboard"/>

      <div className='doctor-container'>

        <div className='doctor-search-back'>

          <div className='doctor-search-field'>
            <input
              type="text"
              placeholder="Search by ID, Name, Gender, or Age"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div>
            <button className="doctor-add-new-patient">Add Patient</button>
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

      <Footer/>

    </div>
  );
};

export default DoctorDashboard;


