import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "./Style/DoctorCreateCase.css";
import Navbar from '../components/Navbar/ConditionalNavbar';

function DoctorCreateCase() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientId: '',
    caseName: '',
    caseDescription: '',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { patientId, caseName, caseDescription } = formData;

    // Get the logged in user info from localStorage
    // const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // const response = await fetch('/api/create-test', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     patientId,
    //     caseName,
    //     caseDescription,
    //     loggedInUser,
    //   }),
    // });

    // if (!response.ok) {
    //   console.error('Error creating test:', response.statusText);
    //   return;
    // }

    // const data = await response.json();
    // console.log('Test created successfully:', data);

    //dummy
    console.log('Test created successfully, formData:', formData);
    console.log('patientId:', patientId);
    console.log('caseName:', caseName);
    console.log('caseDescription:', caseDescription);

    // Navigate to the new page after submission
    navigate('/doctor/patient-test-details/:id/case', { state: formData }); // Pass formData as state

    setFormData({ patientId: '', caseName: '', caseDescription: '' });
  };

  return (
        <div>
            <Navbar/>
                <div className='form-container'>

                    <form onSubmit={handleSubmit}>
                        <div className='form-input'>
                          <label>
                              <div className='label'>
                                <div className='div2'>
                                  <input
                                  type="text"
                                  name="patientId"
                                  value={formData.patientId}
                                  onChange={handleChange}
                                  placeholder='Patient ID'
                                  />
                                </div>
                              </div>
                          </label>
                        </div>

                        <div className='form-input'>
                          <label>
                            <div className='label'>
                              <div className='div2'>
                                <input
                                  type="text"
                                  name="testName"
                                  value={formData.caseName}
                                  onChange={handleChange}
                                  placeholder='Case Name'
                                  />
                              </div>
                            </div>
                          </label>
                        </div>

                        <div className='form-input'>
                          <label>
                            <div className='label'>
                              <div className='div2'>
                                <input
                                type="text"
                                name="testName"
                                value={formData.caseName}
                                onChange={handleChange}
                                placeholder='Case Description'
                                />
                              </div>
                            </div>
                          </label>
                        </div>

                        <button type="submit" >CREATE</button>
                    </form>
                    
                </div>
        </div>
  );
}

export default DoctorCreateCase;
