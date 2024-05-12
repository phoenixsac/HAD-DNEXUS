import React from "react";
import { useNavigate } from "react-router-dom";


import "./Style/AdminDashboard.css";
import ConditionalNavbar from "../components/Navbar/ConditionalNavbar";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";

import { FaUserDoctor } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi";
import { RiBodyScanFill } from "react-icons/ri";
import Footer from "../components/Footer/Footer";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleAddProfesssionalClick = () => {
    navigate("/admin/add-professional"); 
  };

  const handleViewProfessionalClick = () => {
    navigate("/admin/view-professional-list"); 
  };

  // const handleAddRadiologistClick = () => {
  //   navigate("/admin/add-radiologist"); 
  // };

  // const handleViewRadiologistsClick = () => {
  //   navigate("/admin/view-radiologistlist"); 
  // };

  const handleAddFaicilityClick = () => {
    navigate("/admin/add-facility"); 
  };

  const handleViewFacilityClick = () => {
    navigate("/admin/view-facility-list"); 
  };

  const handleViewPatientsClick = () => {
    navigate("/admin/view-patient-list"); 
  };

  return (
    <div>
      <ConditionalNavbar />

      <Breadcrumbs pageTitle="Admin Dashboard" />

      <div className="admin-dashboard">

        <div className="button-container">
          <h2>Professional</h2>
          <div className='dash-icon'>
            <FaUserDoctor />
          </div>
          <div className="buttons">
            <button className="btn" onClick={handleAddProfesssionalClick}>Add</button>
            <button className="btn" onClick={handleViewProfessionalClick}>View</button>
          </div>
        </div>

        {/* <div className="button-container">
          <h2>Radiologist</h2>
          <div className="buttons">
            <button onClick={handleAddRadiologistClick}>Add</button>
            <button onClick={handleViewRadiologistsClick}>View</button>
          </div>
        </div> */}

        <div className="button-container">
          <h2>Facility</h2>
          <div className='dash-icon'>
            <RiBodyScanFill />
          </div>
          <div className="buttons">
            <button className="btn" onClick={handleAddFaicilityClick}>Add</button>
            <button className="btn" onClick={handleViewFacilityClick}>View</button>
          </div>
        </div>

        <div className="button-container">
          <h2>Patient</h2>
          <div className='dash-icon'>
            <HiUsers />
          </div>
          <div className="buttons">
            <button className="btn" onClick={handleViewPatientsClick}>View</button>
          </div>
        </div>

      </div>

        <Footer/>
    </div>
  );
}

export default AdminDashboard;
