// import React, { useState } from 'react';
// import "./DoctorDetails.css";

// function DoctorDetails() {
//   // Dummy data
//   const doctorName = "Dr. Smith";
//   const specialization = "Radiology";
//   const prescription = [
//     "MRI (Magnetic Resonance Imaging)",
//     "Reason : Patient John Doe has been experiencing persistent back pain",
//     "Additional Notes:",
//     "- Ensure the MRI focuses on the lumbar spine.",
//     "- Capture images in both sagittal and axial planes for a comprehensive assessment.",
//     "- Evaluate for any disc herniations, nerve impingements, or other abnormalities.",
//     "- Note any signs of inflammation or degenerative changes in the vertebral discs.",
//     "- Pay attention to the surrounding soft tissues for potential anomalies.",
//     "- Patient may experience mild claustrophobia, so provide necessary support and monitoring during the procedure.",
//     "After the MRI Scan: Please provide a detailed report including:",
//     "- Image analysis and findings.",
//     "- Recommendations for further diagnostic tests or consultations if needed.",
//     "- Treatment suggestions based on the results.",
//     "- Any contraindications or precautions for future medical interventions."
//   ];

//   const [showFullPrescription, setShowFullPrescription] = useState(false);

//   const togglePrescription = () => {
//     setShowFullPrescription(!showFullPrescription);
//   };

//   return (
//     <div className="mri-info-container">
//       <div className="header">
//         <span className="doctor-name">{doctorName}</span>
//         <br />
//         <span className="specialization">{specialization}</span>
//       </div>
//       <div className="prescription">
//         {prescription.slice(0, 5).map((line, index) => (
//           <p key={index}>{line}</p>
//         ))}
//         {!showFullPrescription && (
//           <p onClick={togglePrescription}>Read More</p>
//         )}
//         {showFullPrescription && prescription.slice(5).map((line, index) => (
//           <p key={index + 5}>{line}</p>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default DoctorDetails;


// 

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './DoctorDetails.css';

function DoctorDetails() {
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [prescription, setPrescription] = useState([]);
  const [showFullPrescription, setShowFullPrescription] = useState(false);
  const { testId, consultationId } = useParams();

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        // const doctorId = 2; // Set doctorId param for now
        const doctorId = localStorage.getItem('actorId');
        const idParam = testId ? `consultationId=${testId}` : `consultationId=${consultationId}`;
        const response = await fetch(`http://localhost:8085/core/consultation/doctor-details-by-consultation?${idParam}`);
        if (!response.ok) {
          throw new Error('Failed to fetch doctor details');
        }
        const data = await response.json();
        setDoctorDetails(data);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
        // Handle error as needed
      }
    };

    fetchDoctorDetails();
  }, []); // Empty dependency array ensures the effect runs only once

  // Fetch prescription from backend API
  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        // const consultationId = 2; // Set consultationId param for now
        const idParam = testId ? `consultationId=${testId}` : `consultationId=${consultationId}`;
        // const response = await fetch(`http://localhost:8085/core/consultation/get-test?consultationId=${consultationId}`);
        const response = await fetch(`http://localhost:8085/core/consultation/get-test?${idParam}`);
        if (!response.ok) {
          throw new Error('Failed to fetch prescription');
        }
        const data = await response.text();
        setPrescription(data.split('\n')); // Split text into lines
      } catch (error) {
        console.error('Error fetching prescription:', error);
        // Handle error as needed
      }
    };

    fetchPrescription();
  }, [testId, consultationId]); // Empty dependency array ensures the effect runs only once

  const togglePrescription = () => {
    setShowFullPrescription(!showFullPrescription);
  };

  return (
    <div className="mri-info-container">
      <div className="header">
        <span className="doctor-name">{doctorDetails ? doctorDetails.name : ''}</span>
        <br />
        <span className="specialization">{doctorDetails ? doctorDetails.systemOfMedicine : ''}</span>
      </div>
      <div className="prescription">
        {prescription.slice(0, 5).map((line, index) => (
          <p key={index}>{line}</p>
        ))}
        {!showFullPrescription && (
          <p onClick={togglePrescription}>Read More</p>
        )}
        {showFullPrescription && prescription.slice(5).map((line, index) => (
          <p key={index + 5}>{line}</p>
        ))}
      </div>
    </div>
  );
}

export default DoctorDetails;
