import React from 'react';
import { Link } from 'react-router-dom';

import "./ProfessionalList.css"

const ProfessionalList = ({ professionals }) => {

  return (
    <div className="professional-list" >

      <div className="professional-card heading-card">
        <div className="field">
          <p>Professional ID</p>
        </div>
        <div className="field">
          <p>Full Name</p>
        </div>
        <div className="field">
          <p>Specialization</p>
        </div>
        <div className="field">
          <p>Place of Work</p>
        </div>  
      </div>

      {professionals.map((professional) => (

        <Link className='professional-card-link' 
        key={professional.id} 
        to={`/admin/professional/${professional.professionalId}`}
        >  
          
          <div className="professional-card patient-list-bg">
            <div className="field">
              <p>{professional.professionalId}</p>
            </div>
            <div className="field">
              <p>{professional.firstName} {professional.lastName}</p>
            </div>
            <div className="field">
              <p>{professional.specialization}</p>
            </div>
            <div className="field">
              <p>{professional.placeOfWork}</p>
            </div>  
          </div>
          
      </Link>

      ))}
    </div>
  );
};

export default ProfessionalList;