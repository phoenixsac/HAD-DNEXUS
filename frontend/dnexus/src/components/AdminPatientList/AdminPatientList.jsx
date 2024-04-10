import React from 'react';
import { Link } from 'react-router-dom';

import "./AdminPatientList.css"

const AdminPatientList = ({ patients }) => {

  return (
    <div className="patient-list" >

      <div className="patient-card heading-bg">
        <div className="field">
          <p>patient ID</p>
        </div>
        <div className="field">
          <p>Full Name</p>
        </div>
        <div className="field">
          <p>Gender</p>
        </div>
        <div className="field">
          <p>Age</p>
        </div>  
      </div>

      {patients.map((patient) => (

        <Link className='patient-card-link' 
        key={patient.id} 
        to={`/admin/patient/${patient.id}`}
        >  
          
          <div className="patient-card list-bg">
            <div className="field">
              <p>{patient.id}</p>
            </div>
            <div className="field">
              <p>{patient.name}</p>
            </div>
            <div className="field">
              <p>{patient.gender}</p>
            </div>
            <div className="field">
              <p>{patient.age}</p>
            </div>  
          </div>
          
      </Link>

      ))}
    </div>
  );
};

export default AdminPatientList;