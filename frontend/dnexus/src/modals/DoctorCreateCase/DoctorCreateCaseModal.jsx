import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import "./DoctorCreateCaseModal.css";

function DoctorCreateCaseModal({ onClose }) {

  const params = useParams();
  const { patientId } = params;
  console.log("patientId:", patientId);

  const [formData, setFormData] = useState({
    consultationName: '',
    test: '',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {

    event.preventDefault();
    const { consultationName, test } = formData;
    const  professionalDocId  = localStorage.getItem('actorId');
    console.log("professionalDocId:",professionalDocId);

    console.log("body sent:",professionalDocId,consultationName, test, patientId);
  
    try {
      // Make API call to create the case -> return new consultation id
      const response = await fetch('http://localhost:8085/core/consultation/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ professionalDocId, patientId, consultationName, test }),
      });

      console.log("consutation response:", response);


      if (!response.ok) {
        throw new Error('Failed to create case');
      }

      const response_text = await response.text();
      console.log("response_text:",response_text);

      const idStartIndex = response_text.lastIndexOf(":") + 1; // Index of the first character of the ID
      const newConsultationId = parseInt(response_text.substring(idStartIndex).trim()); // Extract the ID and convert it to an integer
      console.log("newconsultationId:",newConsultationId);
      
  
      // Navigate to the new case page with form data as state
      navigate(`/doctor/patient-test-details/${patientId}/${newConsultationId}`, { state: formData }); 
      // Close the modal
      onClose(); 

    } catch (error) {
      console.error('Error creating case:', error);
      // Handle error (e.g., show error message)
    }
  };
  

  const navigate = useNavigate();

  return (

    <div className="create-case-modal-overlay">
      <div className="create-case-modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Create Case</h2>
        <form className="create-case-modal-form" onSubmit={handleSubmit}>
          <div className='create-case-form-input'>
            <label>Case Name:</label>
            <input
              type="text"
              name="consultationName"
              value={formData.consultationName}
              onChange={handleChange}
              placeholder='Consultation Name'
              required
            />
          </div>
          <div className='create-case-form-input'>
            <label>Case Description:</label>
            <input
              type="text"
              name="test"
              value={formData.test}
              onChange={handleChange}
              placeholder='Consultation Description'
              required
            />
          </div>
          <button type="submit">CREATE</button>
        </form>
      </div>
    </div>

  );
}

export default DoctorCreateCaseModal;
