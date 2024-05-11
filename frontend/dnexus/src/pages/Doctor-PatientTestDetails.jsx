import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import "./Style/PatientTestDetails.css";
import Navbar from '../components/Navbar/ConditionalNavbar';

import { AuthContext } from '../components/Authentication/AuthContext';
import PatientTestItem from '../components/PatientTestItem/PatientTestItem';
import DoctorCreateCaseModal from '../modals/DoctorCreateCase/DoctorCreateCaseModal';
import BreadcrumbsPatientData from '../components/BreadcrumbsPatientData/BreadcrumbsPatientData';
import Footer from '../components/Footer/Footer';


const DocPatientTestDetails = () => {
  const { actorId } = useContext(AuthContext);

  // Initialize actorId state with value from context or local storage
  const [actorIdState, setActorIdState] = useState(actorId || localStorage.getItem('actorId'));

  const navigate = useNavigate();
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [tests, setTests] = useState([]);
  const [isDoctorCreateCaseModalOpen, setDoctorCreateCaseModalOpen] = useState(false); // State to manage the visibility of the modal


  useEffect(() => {
    // Check if actorId is available and not null
    if (actorId) {
      setActorIdState(actorId);
      localStorage.setItem('actorId', actorId);
    }
  }, [actorId]);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        // Fetch patient details from the primary backend endpoint
        const response = await fetch(`http://localhost:8085/core/professional/consultation-card-details?docId=${actorIdState}&patientId=${patientId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch patient data.');
        }
        const data = await response.json();

        console.log("response data:", data);
        // setPatient(data.patient);
        // setTests(data.tests);
        setTests(data);

        // console.log("patient:",patient);
        // console.log("tests:",tests);

        // Make additional API call to fetch patient details from another URL
        const patientResponse = await fetch(`http://localhost:8085/core/consultation/patient-details-by-patient-id?patientId=${patientId}`);
        if (!patientResponse.ok) {
          throw new Error('Failed to fetch patient details from another URL.');
        }
        const patientData = await patientResponse.json();
        setPatient(patientData);

        console.log("patientData:", patientData);

      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };
    if (patientId) {
      fetchPatientData();
    }
  }, [actorIdState, patientId]);

  const handleTestClick = (consultationId) => {
    console.log("Navigate to test details page for test ID:", consultationId);
    console.log("patientId:", patientId);
    console.log("consultationId:", consultationId);

    // Navigate to test details page with patientId and consultationId as parameters
    navigate(`/doctor/patient-test-details/${patientId}/${consultationId}`);
  };

  const handleCreateCase = () => {
    // Open the modal when the "Create Case" button is clicked
    setDoctorCreateCaseModalOpen(true);
    // Add blur effect to the background
    console.log("create case clicked");
    console.log("isDoctorCreateCaseModalOpen:",isDoctorCreateCaseModalOpen);
    // document.body.classList.add('modal-open');
    document.body.classList.add('modal-open');
  }

  const handleModalClose = () => {
    // Close the modal
    setDoctorCreateCaseModalOpen(false);
    // Remove class from body to remove background blur effect
    document.body.classList.remove('modal-open');
  };

  const handleGoBack = () => {
    navigate('/doctor/dashboard');
  };

  return (
    <div>
      <Navbar />

      <BreadcrumbsPatientData/>

      <div className="patient-test-details">
        <div className='header'>
          {/* <div className='patient-data'>
            <p>{patient?.id}</p>
            <p>{patient?.name}</p>
            <p>{patient?.age} / {patient?.gender}</p>
          </div> */}
          <div className='create-case-button'>
            <button onClick={handleCreateCase}>Create Case</button>
            {/* <button onClick={handleGoBack}>Go Back</button> */}
          </div>
        </div>
        {tests && tests.length > 0 && (
          <div className="test-list">
            {tests.map((test) => (
              <PatientTestItem key={test.consultationId} test={test} onTestClick={handleTestClick} />
            ))}
          </div>
        )}
        {isDoctorCreateCaseModalOpen && (
          <DoctorCreateCaseModal onClose={handleModalClose} patientId={patientId} />
        )}
      </div>

      <Footer/>
    </div>
  );
};

export default DocPatientTestDetails;



