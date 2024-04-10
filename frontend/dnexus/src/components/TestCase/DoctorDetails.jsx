import React, { useState } from 'react';
import "./DoctorDetails.css";

function DoctorDetails() {
  // Dummy data
  const doctorName = "Dr. Smith";
  const specialization = "Radiology";
  const prescription = [
    "MRI (Magnetic Resonance Imaging)",
    "Reason : Patient John Doe has been experiencing persistent back pain",
    "Additional Notes:",
    "- Ensure the MRI focuses on the lumbar spine.",
    "- Capture images in both sagittal and axial planes for a comprehensive assessment.",
    "- Evaluate for any disc herniations, nerve impingements, or other abnormalities.",
    "- Note any signs of inflammation or degenerative changes in the vertebral discs.",
    "- Pay attention to the surrounding soft tissues for potential anomalies.",
    "- Patient may experience mild claustrophobia, so provide necessary support and monitoring during the procedure.",
    "After the MRI Scan: Please provide a detailed report including:",
    "- Image analysis and findings.",
    "- Recommendations for further diagnostic tests or consultations if needed.",
    "- Treatment suggestions based on the results.",
    "- Any contraindications or precautions for future medical interventions."
  ];

  const [showFullPrescription, setShowFullPrescription] = useState(false);

  const togglePrescription = () => {
    setShowFullPrescription(!showFullPrescription);
  };

  return (
    <div className="mri-info-container">
      <div className="header">
        <span className="doctor-name">{doctorName}</span>
        <br />
        <span className="specialization">{specialization}</span>
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
