import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import "./Style/DetailsPatient.css" 
import Navbar from "../components/Navbar/ConditionalNavbar"

import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";

const DetailsPatient = () => {
  const { patientId } = useParams(); // Get patient ID from URL parameter
  const parsedId = parseInt(patientId); // Parse patient ID as an integer

  console.log("id:", patientId);
  console.log("parsedId:", parsedId);

  const navigate = useNavigate();

  const [patient, setPatient] = useState({});
  const [error, setError] = useState(null);
  const baseUrl = "http://localhost:8080/";

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); // Retrieve JWT token from local storage
  
        const response = await axios.get(`${baseUrl}admin/details-by-id?patientId=${parsedId}`, {
          headers: {
            'Authorization': `Bearer ${token}` // Include JWT token in headers
          }
        });
  
        setPatient(response.data);
        console.log("response.data:", response.data);

      } catch (error) {
        console.error("Error fetching patient details:", error);
        setError("Error fetching patient details. Please try again."); // Set error state
      }
    };
  
    fetchPatientDetails();
  }, [parsedId]); // Dependency array: fetch on patient ID change

  const handleBack = () => {
    navigate('/admin/dashboard'); 
  };

  const handleEdit = () => {
    console.log('Edit button clicked'); 
  };

  const handleDelete = () => {
    console.log('Delete button clicked'); 
  };

  return (
    <div>
      <Navbar/>
      <div className='patientdetails-container'>
        {error && <div className="error-message">{error}</div>} {/* Display error message if error state is not null */}
        <div className='temp-div'>
            <p>Patient ID: {patient.id}</p>
            <p>Name: {patient.name}</p>
            <p>Age: {patient.age}</p>
            <p>Gender: {patient.gender}</p>
            <p>Blood Group: {patient.bloodGroup}</p>
            <p>Contact: {patient.contact}</p>
        </div>
        <div className='buttons'>
          <button className='back' onClick={handleBack}><IoMdArrowRoundBack /> Back</button>
          <button className='edit' onClick={handleEdit}><FaRegEdit /> Edit</button>
          <button className='delete' onClick={handleDelete}><MdDelete /> Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPatient;
