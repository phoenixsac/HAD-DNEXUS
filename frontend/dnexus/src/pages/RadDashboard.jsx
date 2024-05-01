import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import "./Style/RadDashboard.css";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import Footer from "../components/Footer/Footer";

import { AuthContext } from '../components/Authentication/AuthContext';
import Navbar from '../components/Navbar/ConditionalNavbar';
import PatientTestItem from '../components/PatientTestItem/PatientTestItem';

const RadDashboard = () => {

  const navigate = useNavigate();

  const { actorId } = useContext(AuthContext);
  console.log("actorId:",actorId);

  // Initialize actorId state with value from local storage or context
  const [actorIdState, setActorIdState] = useState(actorId || localStorage.getItem('actorId'));
  console.log("actorIdState:", actorIdState);

  const [tests, setTests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const [testsPerPage] = useState(6);

  const [filteredTests, setFilteredTests] = useState([]);
  const [allTests, setAllTests] = useState([]);

  useEffect(() => {
    // Check if actorId is available and not null
    if (actorId) {
      setActorIdState(actorId);
      localStorage.setItem('actorId', actorId);
    }
  }, [actorId]);

  useEffect(() => {
    if (actorIdState) {
      const fetchFacilityData = async () => {
        try {
          const userType = sessionStorage.getItem('userType');
          const jwtToken = localStorage.getItem('jwtToken');

          if (!userType || !jwtToken) {
            throw new Error('User type or token not found.');
          }

          const response = await axios.get(`http://localhost:8085/core/professional/consultation-card-details-for-radiologist?profRadiologistId=${actorIdState}`, {
            // headers: {
            //   'Authorization': `Bearer ${token}`
            // }
          });
          console.log("response:",response.data);

          setTests(response.data);
          setAllTests(response.data);

          console.log("tests:",tests);
          console.log("Alltests:",allTests);

        } catch (error) {
          console.error('Error fetching test data:', error);
        }
      };

      fetchFacilityData();
    }
  }, [actorIdState]);

  useEffect(() => {
    console.log("Search term:", searchTerm);
    console.log("All tests:", allTests);

    if (!searchTerm) {
      setFilteredTests(allTests);
    } else {
      const filtered = allTests.filter((test) =>
      (test.consultationId && test.consultationId.toString().includes(searchTerm)) ||
      (test.dateCreated && test.dateCreated.includes(searchTerm)) ||
      (test.name && test.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (test.status && test.status.toLowerCase().includes(searchTerm.toLowerCase()))
    );

      console.log("Filtered tests:", filtered);

      setTests(filtered);
    }
  }, [searchTerm, allTests]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase()); // Ensure case-insensitive search
  };

  const handleTestClick = (testId) => {
    console.log("Navigate to test details page for test ID:", testId);
    // console.log("patientId:", patientId);
    console.log("consultationId:", testId);

    // Navigate to test details page with patientId and consultationId as parameters
    navigate(`/rad/patient-test-details/${testId}`);
  };

  return (
    <div>
      <Navbar/>

      <Breadcrumbs pageTitle="Radiologist Dashboard"/>
      
      <div className="rad-dashboard-container">
        <div className='search-patient'>

          <div className='field'>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          </div>
          <div className="test-test-details">

          <div className="test-list">
            {tests.map((test) => (
              <PatientTestItem key={test.id} test={test} onTestClick={handleTestClick} />
            ))}
          </div>

          </div>
        </div>

        <Footer/>
    </div>
  );
};

export default RadDashboard;





