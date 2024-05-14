import React from 'react';
import { useState } from 'react';

import "./PatientTestItem.css";

const PatientTestItem = ({ test, onTestClick }) => {
  const [hovered, setHovered] = useState(false);

    const handleClick = () => {
      // Pass the consultation ID to the onTestClick callback
      onTestClick(test.consultationId);
    };


    const testStatusColor = () => {
      switch (test.status.toLowerCase()) {
        case 'completed':
          return '#B4D4FF';
        case 'ongoing':
          return '#BFCFE7';
        default:
          return 'white';
      }
    };

    const handleMouseEnter = () => {
      setHovered(true);
    };
  
    const handleMouseLeave = () => {
      setHovered(false);
    };
  
  
    return (
      <div className={`test-list-item ${test.consentStatus === 'WITHDRAWN' ? 'disabled' : ''}`} 
        // onClick={handleClick} 
        onClick={test.consentStatus !== 'WITHDRAWN' ? handleClick : undefined}
        style={{ backgroundColor: testStatusColor() }} 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >

        <div className='div1'>
        <p>{test.consultationId}</p>
        <div className='consultation-card-consent-status'>
            <p>Consent: {test.consentStatus}</p>
            <p>{test.dateCreated}</p>
        </div>
          
        </div>

        {/* <div>
          <p>{test.consentStatus}</p>
        </div> */}

        <div className='div2'>
          <p>{test.name} / {test.status}</p>
        </div>
        
        <div className='div-desc'>
          {/* <p>{test.description.substring(0, 200)}...</p> */}
          <p>This is a sample description for the consultation... </p>
        </div>

      </div>
    );
  };
  
  export default PatientTestItem;
  