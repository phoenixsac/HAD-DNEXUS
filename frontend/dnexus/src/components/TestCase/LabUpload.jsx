import React from 'react';
import './LabUpload.css';

const LabUpload = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>Close</button>
        <textarea placeholder="Enter your message..." />
        <input type="file" accept="image/*" />
        <button>Upload Photos</button>
      </div>
    </div>
  );
};

export default LabUpload;
