import React from "react";
import { useNavigate } from "react-router-dom";


import "./Style/AdminDashboard.css";
import ConditionalNavbar from "../components/Navbar/ConditionalNavbar";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleAddDoctorClick = () => {
    navigate("/admin/add-doctor"); 
  };

  const handleViewDoctorsClick = () => {
    navigate("/admin/view-doctorlist"); 
  };

  const handleAddRadiologistClick = () => {
    navigate("/admin/add-radiologist"); 
  };

  const handleViewRadiologistsClick = () => {
    navigate("/admin/view-radiologistlist"); 
  };

  const handleAddLabTechnicianClick = () => {
    navigate("/admin/add-lab"); 
  };

  const handleViewLabTechniciansClick = () => {
    navigate("/admin/add-lab"); 
  };

  const handleViewPatientsClick = () => {
    navigate("/admin/view-patientlist"); 
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
            <button onClick={handleAddRadiologistClick}>Add</button>
            <button onClick={handleViewRadiologistsClick}>View</button>
          </div>
        </div>
        <div className="button-container">
          <h2>Laboratory</h2>
          <div className="buttons">
            <button onClick={handleAddLabTechnicianClick}>Add</button>
            <button onClick={handleViewLabTechniciansClick}>View</button>
          </div>
        </div>
        <div className="button-container">
          <h2>Patient</h2>
          <div className="buttons">
            <button onClick={handleViewPatientsClick}>View</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
