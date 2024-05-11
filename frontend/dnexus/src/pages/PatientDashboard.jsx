import React, { useState, useEffect, useContext } from 'react';
import { Link , useNavigate } from 'react-router-dom';

import axios from 'axios';

import "./Style/PatientDashboard.css";

import { AuthContext } from '../components/Authentication/AuthContext';
import Navbar from '../components/Navbar/ConditionalNavbar';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Footer from '../components/Footer/Footer';



function PatientDashboard() {  

  const navigate = useNavigate();
  const { actorId } = useContext(AuthContext);

  // Initialize actorId state with value from local storage or context
  const [actorIdState, setActorIdState] = useState(actorId || localStorage.getItem('actorId'));
  console.log("actorIdState:", actorIdState);

  const [consultations, setconsultations] = useState([]);
  const [error, setError] = useState(null);
  const [selectedConsent, setSelectedConsent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // const [searchTerm, setSearchTerm] = useState('');
  // const [currentPage, setCurrentPage] = useState(1); // For pagination
  // const [patientsPerPage] = useState(6);

  useEffect(() => {
    // Check if actorId is available and not null
    if (actorId) {
      setActorIdState(actorId);
      localStorage.setItem('actorId', actorId);
    }
  }, [actorId]);

  useEffect(() => {
    if (actorIdState) {
      const fetchConsultations = async () => {
        try {
          const userType = sessionStorage.getItem('userType');
          const jwtToken = localStorage.getItem('jwtToken');

          if (!userType || !jwtToken) {
            throw new Error('User type or token not found.');
          }

          const response = await axios.get(`http://localhost:8080/patient/consultation-list?patientId=${actorIdState}`, {
            headers: {
              'Authorization': `Bearer ${jwtToken}`
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
    }
  }, [actorIdState]); 

  const handleViewConsent = async (consultationId) => {
    console.log("handleViewConsent clicked");
    try {
      // const jwtToken = localStorage.getItem('jwtToken');

      // if (!jwtToken) {
      //   throw new Error('JWT token not found.');
      // }

      const response = await axios.get(`http://localhost:8085/core/consent/all/${consultationId}`, {
        headers: {
          // 'Authorization': `Bearer ${jwtToken}`
        }
      });

      console.log("response2:",response.data);

      setSelectedConsent(response.data);
      console.log('selectedConsent:',selectedConsent);

      setShowModal(true);

    } catch (error) {
      console.error('Error fetching consents:', error);
      setError('Error fetching consents. Please try again.');
    }
  };

  return (
    <>
      <Navbar />

      <Breadcrumbs pageTitle="Patient Dashboard"/>

      <div className="dashboard-container" >

          <div className="patient-card heading-card">
            <div className="field">
              <p>Consultation ID</p>
            </div>
            <div className="field">
              <p>Consultation Name</p>
            </div>
            <div className="field">
              <p>Date Created</p>
            </div>
            <div className="field">
              <p>Status</p>
            </div>  
            <div className="field">
              <p>Consent</p>
            </div> 
          </div>

          {consultations.map((consultation) => (

            <Link className='patient-card-link' 
            key={consultation.consultationId} 
            to={`/patient/patient-test-details/${consultation.consultationId}`}
            >  
              
              <div className="patient-card patient-list-bg">
                <div className="field">
                  <p>{consultation.consultationId}</p>
                </div>
                <div className="field">
                  <p>{consultation.name}</p>
                </div>
                <div className="field">
                  <p>{consultation.dateCreated}</p>
                </div>
                <div className="field">
                  <p>{consultation.status}</p>
                </div>  
                <div className="field">
                  <Link className='consent-view-link' onClick={() => handleViewConsent(consultation.consultationId)}>View</Link>
                </div> 
              </div>
              
          </Link>

          ))}

          {/* {showModal && (
                    <div className="consent-view-modal-overlay">
                      <div className="consent-modal-content">
                        <span className="consent-close" onClick={() => setShowModal(false)}>&times;</span>
                        {selectedConsent && selectedConsent.map((consent) => (
                          <div key={consent.id}>
                            <p>Entity Name: {consent.entityName}</p>
                            <p>Consent Status: {consent.consentStatus}</p>
                            <button>Withdraw</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )} */}
          
          {showModal && (
            <div className="consent-view-modal-overlay">
              <div className="consent-modal-content">
                <span className="consent-close" onClick={() => setShowModal(false)}>&times;</span>
                <table>
                  <thead>
                    <tr>
                      <th>Entity Name</th>
                      <th>Entity Type</th>
                      <th>Consent Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedConsent && selectedConsent.map((consent) => (
                      <tr key={consent.id}>
                        <td>{consent.entityName}</td>
                        <td>{consent.entityType}</td>
                        <td>{consent.consentStatus}</td>
                        <td><Link className='consent-withdraw-link'>Withdraw</Link></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}


          </div>

      <Footer/>
    </>

  );
}

export default PatientDashboard;

     