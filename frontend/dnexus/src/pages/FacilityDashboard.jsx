import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import PatientTestItem from '../components/PatientTestItem/PatientTestItem';
import "./Style/PatientTestDetails.css";
import Navbar from '../components/Navbar/ConditionalNavbar';
import { AuthContext } from '../components/Authentication/AuthContext';

const FacilityDashboard = () => {
  const { actorId, setActorId } = useContext(AuthContext);
  console.log("1actorId:",actorId);

  const storedActorId = localStorage.getItem('actorId');
  console.log("storedActorId:",storedActorId);

  const navigate = useNavigate();

  const [tests, setTests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFacilityData = async () => {
      try {
        // const token = localStorage.getItem('jwtToken');
        const response = await axios.get(`http://localhost:8085/core/facility/consultation-list?facLabId=${storedActorId}`, {
          // headers: {
          //   'Authorization': `Bearer ${token}`
          // }
        });

        console.log("response:",response.data);

        setTests(response.data);

      } catch (error) {
        console.error('Error fetching patient data:', error);
        setError('Error fetching patient data. Please try again.');
      }
    };
    console.log("2actorId:",actorId);
    fetchFacilityData();
  }, [storedActorId]);

  useEffect(() => {
    const storedActorId = localStorage.getItem('actorId');
    console.log("3actorId:",storedActorId);
    if (storedActorId) {
      setActorId(storedActorId);
    } else {
      // Redirect the user to the login page if actorId is not found in local storage
      navigate('/Login');
    }
  }, []);

  const handleTestClick = (testId) => {
    console.log(`Navigate to test details page for test ID: ${testId}`);
    // Handle navigation to test details page with test ID
  };

  return (
    <div>
      <Navbar/>
      <div className="patient-test-details">
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="test-list">
            {tests.map((test) => (
              <PatientTestItem key={test.id} test={test} onTestClick={handleTestClick} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FacilityDashboard;
