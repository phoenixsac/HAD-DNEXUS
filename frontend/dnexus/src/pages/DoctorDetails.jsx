import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import "./Style/DoctorDetails.css" 
import Navbar from "../components/Navbar/ConditionalNavbar"

import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";

const DoctorDetails = () => {
  const { doctorId } = useParams(); // Get doctor ID from URL parameter
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState({});

  // useEffect(() => {
  //   const fetchDoctorDetails = async () => {
  //     const response = await axios.get(`http://localhost:8080/admin/view-doctor-details/${doctorId}`);
  //     setDoctor(response.data);
  //   };

  //   fetchDoctorDetails();
  // }, [doctorId]); // Dependency array: fetch on doctor ID change


  // Dummy data for testing
  useEffect(() => {
    const dummyDoctor = {
      id: 1,
      name: 'John Doe',
      specialization: 'Cardiology',
      registrationNo: '12345',
      email: 'johndoe@example.com',
      phoneNo: '123-456-7890'
    };
    setDoctor(dummyDoctor);
  }, []); // Empty dependency array to run once on component mount


  const handleBack = () => {
    navigate('/admin/view-doctorlist'); 
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
            <h2>Hospital Name</h2> {/* Replace with actual hospital name */}
          </div>

          <div className='doctor-info'>
            <div className='doc-image'>
                {/* add image */}
            </div>

            <div className="doc-data">

              <div className='doc'>
                <h3>Dr. {doctor.name}</h3>
                <p className='doc-spec'>{doctor.specialization}</p>
              </div>

              <div className='doc'>
                <p className='title'>Registration No.</p>
                <p>{doctor.registrationNo}</p>
              </div>

              <div className='doc'>
                <p className='title'>Email</p>
                <p>{doctor.email}</p>
              </div>

              <div className='doc'>
                <p className='title'>Phone</p>
                <p>{doctor.phoneNo}</p>
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

export default DoctorDetails;
