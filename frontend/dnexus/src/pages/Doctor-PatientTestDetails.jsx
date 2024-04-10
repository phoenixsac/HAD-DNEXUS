import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PatientTestItem from '../components/PatientTestItem/PatientTestItem';
import "./Style/PatientTestDetails.css";
import Navbar from '../components/Navbar/ConditionalNavbar';
import { AuthContext } from '../components/Authentication/AuthContext';

const DocPatientTestDetails = () => {

  const{ actorId } = useContext(AuthContext);
  const navigate = useNavigate();
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        // Fetch patient details from the primary backend endpoint
        const response = await fetch(`http://localhost:8085/core/professional/consultation-card-details?docId=${actorId}&patientId=${patientId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch patient data.');
        }
        const data = await response.json();

        console.log("response data:", data);
        // console.log("data.tests:", data.tests);

        setPatient(data.patient);
        setTests(data);

        // setTests(data || []);

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
  }, [ patientId ]);

  const handleTestClick = (testId) => {
    console.log(`Navigate to test details page for test ID: ${testId}`);
  };

  const handleCreateCase = () => {
    navigate(`/doctor/patient-test-details/${patientId}/create-case`);
  }

  const handleGoBack = () => {
    navigate('/doctor/dashboard/');
  }

  return (
    <div>
      <Navbar />
      <div className="patient-test-details">
        <div className='header'>
          <div className='patient-data'>
            <p>{patient?.id}</p>
            <p>{patient?.name}</p>
            <p>{patient?.age} / {patient?.gender}</p>
          </div>
          <div className='create-button'>
            <button onClick={handleCreateCase}>Create Case</button>
            <button onClick={handleGoBack}>Go Back</button>
          </div>
        </div>
        {tests.length > 0 && (
          <div className="test-list">
            {tests.map((test) => (
              <PatientTestItem key={test.consultationId} test={test} onTestClick={handleTestClick} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocPatientTestDetails;
