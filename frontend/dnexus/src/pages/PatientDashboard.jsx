import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import "./Style/PatientDashboard.css";
import Navbar from '../components/Navbar/ConditionalNavbar';

function PatientDashboard() {  
  const [consultations, setconsultations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const token = localStorage.getItem('jwtToken');

        // Make API call to fetch patient consultations
        const response = await axios.get(`http://localhost:8080/patient/consultation-list?patientId=2`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // Set fetched consultations to state
        setconsultations(response.data);

        console.log("response:",response.data);

        // const data = await response.json();
        // console.log("data:",data);

        console.log("consultations:",consultations);

      } catch (error) {
        console.error('Error fetching consultations:', error);
        setError('Error fetching consultations. Please try again.');
      }
    };

    fetchConsultations();
  }, []); // Dependency array is empty to ensure the effect runs only once

  return (
    <>
      <Navbar />
      <div className='container'>
      <div className='childcontainer'>
        <div>
                <div className='card'>
                  <div className='cardId'><p>ConsultationId</p></div>
                  <div className='cardName'><p>Name</p></div>
                  <div className='datecreated'><p>DateCreated</p></div>
                  <div className='cardStatus'><p>Status</p></div>
                </div>
            </div>
        </div>
        <div className='childcontainer'>
          {error && <p>{error}</p>}
          {consultations.map((consultation) => (
            <div key={consultation.consultationId}>
              <Link to={`/patient/report/${consultation.consultationId}`} className="link-no-underline">
                <div className='card'>
                  <div className='cardId'><p>{consultation.consultationId}</p></div>
                  <div className='cardName'><p>{consultation.name}</p></div>
                  <div className='date'><p>{consultation.dateCreated}</p></div>
                  <div className='cardStatus'><p>{consultation.status}</p></div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PatientDashboard;