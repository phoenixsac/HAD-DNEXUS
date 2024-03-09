import React from "react";
import { useNavigate } from "react-router-dom";


import "./Style/AdminDashboard.css";
import ConditionalNavbar from "../components/Navbar/ConditionalNavbar";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleAddDoctorClick = () => {
    navigate("/add-doctor"); // Replace with your actual add doctor route
  };

  const handleViewDoctorsClick = () => {
    navigate("/view-doctors"); // Replace with your actual view doctors route
  };

  const handleAddRadiologistClick = () => {
    navigate("/add-radiologist"); // Replace with your actual add radiologist route
  };

  const handleViewRadiologistsClick = () => {
    navigate("/view-radiologists"); // Replace with your actual view radiologists route
  };

  const handleAddLabTechnicianClick = () => {
    navigate("/add-lab-technician"); // Replace with your actual add lab technician route
  };

  const handleViewLabTechniciansClick = () => {
    navigate("/view-lab-technicians"); // Replace with your actual view lab technicians route
  };

  return (
    <div>
      <ConditionalNavbar />
      <div className="admin-dashboard">
        <div className="button-container">
          <h2>Doctor</h2>
          <div className="buttons">
            <button onClick={handleAddDoctorClick}>Add</button>
            <button onClick={handleViewDoctorsClick}>View</button>
          </div>
        </div>
        <div className="button-container">
          <h2>Radiologist</h2>
          <div className="buttons">
            <button onClick={handleAddDoctorClick}>Add</button>
            <button onClick={handleViewDoctorsClick}>View</button>
          </div>
        </div>
        <div className="button-container">
          <h2>Laboratory</h2>
          <div className="buttons">
            <button onClick={handleAddDoctorClick}>Add</button>
            <button onClick={handleViewDoctorsClick}>View</button>
          </div>
        </div>
        <div className="button-container">
          <h2>Patient</h2>
          <div className="buttons">
            {/* <button onClick={handleAddDoctorClick}>Remove</button> */}
            <button onClick={handleViewDoctorsClick}>View</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
