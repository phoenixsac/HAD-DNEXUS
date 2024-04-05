import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import "./Style/RadiologistDetails.css" 
import Navbar from "../components/Navbar/ConditionalNavbar"

import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";

const RadiologistDetails = () => {
  const { radId } = useParams(); 
  const navigate = useNavigate();

  const [rad, setRad] = useState({});

  // useEffect(() => {
  //   const fetchDoctorDetails = async () => {
  //     const response = await axios.get(`http://localhost:8080/admin/view-doctor-details/${doctorId}`);
  //     setDoctor(response.data);
  //   };

  //   fetchDoctorDetails();
  // }, [doctorId]); // Dependency array: fetch on doctor ID change


  // Dummy data for testing
  useEffect(() => {
    const dummyRad = {
      id: 1,
      name: 'John Doe',
      specialization: 'Cardiology',
      registrationNo: '12345',
      email: 'johndoe@example.com',
      phoneNo: '123-456-7890'
    };
    setRad(dummyRad);
  }, []); // Empty dependency array to run once on component mount


  const handleBack = () => {
    navigate('/admin/view-radiologistlist'); 
  };

  const handleEdit = () => {
    // Implement logic for editing doctor details (potentially navigate to edit form)
    console.log('Edit button clicked for rad:', rad); 
  };

  const handleDelete = () => {
    // Implement logic for deleting doctor account 
    console.log('Delete button clicked for rad:', rad); 
  };

  return (
    <div>
      <Navbar/>
      <div className='raddetails-container'>

        <div className="rad-details">

          <div className='hosp-name'>
            <h2>Hospital Name</h2> {/* Replace with actual hospital name */}
          </div>

          <div className='rad-info'>
            <div className='rad-image'>
                {/* add image */}
            </div>

            <div className="rad-data">

              <div className='rad'>
                <h3>Dr. {rad.name}</h3>
                <p className='rad-spec'>{rad.specialization}</p>
              </div>

              <div className='rad'>
                <p className='title'>Registration No.</p>
                <p>{rad.registrationNo}</p>
              </div>

              <div className='rad'>
                <p className='title'>Email</p>
                <p>{rad.email}</p>
              </div>

              <div className='rad'>
                <p className='title'>Phone</p>
                <p>{rad.phoneNo}</p>
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

export default RadiologistDetails;