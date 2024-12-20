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

  return (
    
    <div>
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
              </div>
              
          </Link>

          ))}


          </div>

      <Footer/>
    </div>

  );
}

export default PatientDashboard;

      // {/* <div className='dashboard-container'>
      //   <div className='child-container'>
      //     <div>
      //             <div className='card'>
      //               <div className='cardId'><p>ConsultationId</p></div>
      //               <div className='cardName'><p>Name</p></div>
      //               <div className='datecreated'><p>DateCreated</p></div>
      //               <div className='cardStatus'><p>Status</p></div>
      //             </div>
      //     </div>
      //   </div>

      //   <div className='child-container'>
      //       {error && <p>{error}</p>}
      //       {consultations.map((consultation) => (
      //         <div key={consultation.consultationId}>
      //           <Link to={`/patient/patient-test-details/${consultation.consultationId}`} className="link-no-underline">
      //             <div className='card'>
      //               <div className='cardId'><p>{consultation.consultationId}</p></div>
      //               <div className='cardName'><p>{consultation.name}</p></div>
      //               <div className='date'><p>{consultation.dateCreated}</p></div>
      //               <div className='cardStatus'><p>{consultation.status}</p></div>
      //             </div>
      //           </Link>
      //         </div>
      //       ))}
      //   </div>

      // </div> */}