import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import "./DoctorCreateCaseModal.css";

function DoctorCreateCaseModal({ onClose }) {

    const patientId = useParams();
    console.log("patientId:",patientId);

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
    const { professionalDocId } = localStorage.getItem('actorId');
  
    try {
      // Make API call to create the case -> return new consultation id
      const response = await fetch('http://localhost:8085/core/consultation/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ professionalDocId, patientId, consultationName, test }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create case');
      }

      const newconsultationId = await response.json();
      console.log("newconsultationId:",newconsultationId);
  
      // Navigate to the new case page with form data as state
      navigate(`/doctor/patient-test-details/${patientId}/${newconsultationId}`, { state: formData }); // Navigate to new case page with form data
      onClose(); // Close the modal

    } catch (error) {
      console.error('Error creating case:', error);
      // Handle error (e.g., show error message)
    }
  };
  

  const navigate = useNavigate();

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Create Case</h2>
        <form onSubmit={handleSubmit}>
          {/* <div className='form-input'>
            <label>Patient ID:</label>
            <input
              type="text"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              placeholder='Patient ID'
              required
            />
          </div> */}
          <div className='form-input'>
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
          <div className='form-input'>
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
