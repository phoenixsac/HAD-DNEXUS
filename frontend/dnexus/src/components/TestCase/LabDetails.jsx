import React from 'react';
import './LabDetails.css';

const LabDetails = () => {
    const labName = "LAB NAME";
  const description = "Description";
    const handleClick = () => {
        alert("Button clicked!");
          };
  

          return (
            <div className="info-container">
                <div className="header">
                    <span className="lab-name">{labName}</span>
                    <br />
                    <span >
                    <button className='lab-button' onClick={handleClick}>View/Annotate Images</button>
                    </span>
                </div>
                <div className="description">
                    <p>{description}</p>
                </div>
            </div>
        );
};

export default LabDetails;
