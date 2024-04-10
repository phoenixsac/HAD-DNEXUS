import React from 'react';
import { useState } from 'react';

import "./PatientTestItem.css";

const PatientTestItem = ({ test, onTestClick }) => {
  const [hovered, setHovered] = useState(false);

    const testStatusColor = () => {
      switch (test.status) {
        case 'Completed':
          return '#D6F0E0';
        case 'In Progress':
          return '#FEFFD6';
        case 'upcoming':
          return '#FFD3D3';
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
      <div className="test-list-item" 
        onClick={onTestClick} 
        style={{ backgroundColor: testStatusColor() }} 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >

        <div className='div1'>
          <p>{test.consultationId}</p>
          <p>{test.dateCreated}</p>
        </div>

        <div className='div2'>
          <p>{test.name} / {test.status}</p>
        </div>
        
        <div className='div-desc'>
          {/* <p>{test.description.substring(0, 200)}...</p> */}
          <p>djchbdsncscjsdncmscldskjbvdsmvmdskcidsjndsm ldskcjidshcndskjnckjdsbvjdsbdsjncklsjcishcjndsckdsckdshcjdscndkncdskj</p>
        </div>

      </div>
    );
  };
  
  export default PatientTestItem;
  