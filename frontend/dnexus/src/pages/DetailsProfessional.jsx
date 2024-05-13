import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import "./Style/DetailsProfessional.css" 

import Navbar from "../components/Navbar/ConditionalNavbar"
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Footer from '../components/Footer/Footer';
import ConfirmationModal from '../modals/ConfirmationModal/ConfirmationModal';

import { MdDelete } from "react-icons/md";

const DetailsProfessional = () => {
  const { id } = useParams(); // Get doctor ID from URL parameter
  const parsedid = parseInt(id); // Parse doctor ID as an integer

  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

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

        console.log("response:", response);
  
        setDoctor(response.data);
        console.log("response.data:", response.data);
        
      } catch (error) {
        console.error("Error fetching doctor details:", error);
        // Implement proper error handling here
      }
    };
  
    fetchDoctorDetails();
  }, [parsedid]); // Dependency array: fetch on doctor ID change


  const handleDelete = () => {
    // Implement logic for deleting doctor account 
    setShowModal(true);
    console.log('Delete button clicked for doctor:', doctor); 
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    setShowModal(false);

    try {
      const token = localStorage.getItem('jwtToken'); // Retrieve JWT token from local storage
      const response = await axios.delete(`http://localhost:8080/admin/delete-professional/${parsedid}`, {
        headers: {
          'Authorization': `Bearer ${token}` // Include JWT token in headers
        }
      });

      console.log("Delete response:", response);
      setDeleteSuccess(true);
    } catch (error) {
      console.error("Error deleting professional:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Navbar/>

      <Breadcrumbs pageTitle="Professional Details"/>

      <div className='doctordetails-container'>

        <div className="doctor-details">

          <div className='doctor-name'>
            <h2>Dr. {doctor.firstName} {doctor.lastName}</h2> {/* Replace with actual hospital name */}
            <h3>{doctor.specialization}</h3>
          </div>

          <div className='doctor-info'>

            <div className="doc-data">

              <div className="doc">
                <p className="title">Hospital Name: {doctor.placeOfWork}</p>
              </div>

              <div className='doc'>
                <p className='title'>Registration No.: {doctor.professionalId}</p>
              </div>

              <div className='doc'>
                <p className='title'>Email: {doctor.emailId}</p>
              </div>

              <div className='doc'>
                <p className='title'>Phone: {doctor.contactNumber}</p>
              </div>

            </div>

          </div>
        </div>

        {/* <div className='buttons'>
          <button className='delete' onClick={handleDelete}><MdDelete /> Delete</button>
        </div> */}
        {!showModal && (
          <div className='buttons'>
            <button className='delete' onClick={handleDelete}><MdDelete /> Delete</button>
          </div>
        )}

        {showModal && (
          <ConfirmationModal
            // title="Confirm Delete"
            message="Are you sure you want to delete?"
            onConfirm={confirmDelete}
            onClose={closeModal}
            isDeleting={isDeleting}
            success={deleteSuccess}
          />
        )}

      </div>

      <Footer/>
    </div>
  );
};

export default DetailsProfessional;


