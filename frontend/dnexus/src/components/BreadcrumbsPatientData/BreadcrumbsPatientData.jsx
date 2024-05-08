import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './BreadcrumbsPatientData.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const BreadcrumbsPatientData = () => {

  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
    
    useEffect(() => {
        const fetchPatientData = async () => {
          try {
    
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
      }, [patientId]);
      
    return (
        <div className="breadcrumbs-patient overlay">
            <div className='patient-div'>    
             <div className="patient-name">
              <h1>{patient?.name}</h1>
             </div>
             <div className='patient-bread-details'>
                <p>{patient?.id}</p>
                <p>{patient?.age} / {patient?.gender}</p>
              </div>
            </div>
         </div>
           
    );
}

export default BreadcrumbsPatientData;