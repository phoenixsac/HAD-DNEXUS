import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import "./Style/DetailsFacility.css" // Import your CSS file
import Navbar from "../components/Navbar/ConditionalNavbar"

import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";

const DetailsFacility = () => {
  const { facilityId } = useParams(); // Get facility ID from URL parameter
  const navigate = useNavigate();
  const baseUrl = "http://localhost:8080/";

  const [facility, setfacility] = useState({});

  // useEffect(() => {
  //   const fetchfacilityDetails = async () => {
  //     const response = await axios.get(`http://localhost:8080/admin/view-facility-details/${facilityId}`);
  //     setfacility(response.data);
  //   };

  //   fetchfacilityDetails();
  // }, [facilityId]); // Dependency array: fetch on facility ID change


  // Dummy data for testing
  useEffect(() => {
    const dummyfacility = {
      id: 1,
      name: 'John Doe',
      specialization: 'Cardiology',
      registrationNo: '12345',
      email: 'johndoe@example.com',
      phoneNo: '123-456-7890'
    };
    setfacility(dummyfacility);
  }, []); // Empty dependency array to run once on component mount


  const handleBack = () => {
    navigate('/admin/view-facility-list'); // Go back to facilitys list
  };

  const handleEdit = () => {
    // Implement logic for editing facility details (potentially navigate to edit form)
    console.log('Edit button clicked for facility:', facility); 
  };

  const handleDelete = () => {
    // Implement logic for deleting facility account 
    console.log('Delete button clicked for facility:', facility); 
  };

  return (
    <div>
      <Navbar/>
      <div className='facilitydetails-container'>

        <div className="facility-details">

          <div className='facility-name'>
            <h2>Facility Name</h2> {/* Replace with actual hospital name */}
          </div>

          <div className='facility-info'>
            <div className='fac-image'>
                {/* add image */}
            </div>

            <div className="fac-data">

              <div className='fac'>
                <h3>Dr. {facility.name}</h3>
                <p className='fac-spec'>{facility.specialization}</p>
              </div>

              <div className='fac'>
                <p className='title'>Registration No.</p>
                <p>{facility.registrationNo}</p>
              </div>

              <div className='fac'>
                <p className='title'>Email</p>
                <p>{facility.email}</p>
              </div>

              <div className='fac'>
                <p className='title'>Phone</p>
                <p>{facility.phoneNo}</p>
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

export default DetailsFacility;