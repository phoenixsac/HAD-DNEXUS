import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import "./Style/DetailsProfessional.css" 
import Navbar from "../components/Navbar/ConditionalNavbar"

import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";

const DetailsProfessional = () => {
  const { id } = useParams(); // Get doctor ID from URL parameter
  const parsedid = parseInt(id); // Parse doctor ID as an integer

  console.log("id:", id);
  console.log("parsedid:", parsedid);

  const navigate = useNavigate();

  const [doctor, setDoctor] = useState({});

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); // Retrieve JWT token from local storage
  
        const response = await axios.get('http://localhost:8080/admin/professional-by-id', {
          params: { id: parsedid }, // Send id as request parameter
          headers: {
            'Authorization': `Bearer ${token}` // Include JWT token in headers
          }
        });
  
        setDoctor(response.data);
        console.log("response.data:", response.data);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
        // Implement proper error handling here
      }
    };
  
    fetchDoctorDetails();
  }, [parsedid]); // Dependency array: fetch on doctor ID change


  const handleBack = () => {
    navigate('/admin/view-professional-list'); 
  };

  const handleEdit = () => {
    // Implement logic for editing doctor details (potentially navigate to edit form)
    console.log('Edit button clicked for doctor:', doctor); 
  };

  const handleDelete = () => {
    // Implement logic for deleting doctor account 
    console.log('Delete button clicked for doctor:', doctor); 
  };

  return (
    <div>
      <Navbar/>
      <div className='doctordetails-container'>

        <div className="doctor-details">

          <div className='hosp-name'>
            <h2>{doctor.placeOfWork}</h2> {/* Replace with actual hospital name */}
          </div>

          <div className='doctor-info'>
            <div className='doc-image'>
                {/* add image */}
            </div>

            <div className="doc-data">

              <div className='doc'>
                <h3>Dr. {doctor.firstName} {doctor.lastName}</h3>
                <p className='doc-spec'>{doctor.specialization}</p>
              </div>

              <div className='doc'>
                <p className='title'>Registration No.</p>
                <p>{doctor.professionalId}</p>
              </div>

              <div className='doc'>
                <p className='title'>Email</p>
                <p>{doctor.emailId}</p>
              </div>

              <div className='doc'>
                <p className='title'>Phone</p>
                <p>{doctor.contactNumber
}</p>
              </div>

            </div>

          </div>
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

export default DetailsProfessional;


