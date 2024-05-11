import React, { useState } from 'react';
import './LabUpload.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const LabUpload = ({ onClose }) => {
  const { consultationId } = useParams();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [remarks, setRemarks] = useState('');

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    console.log('Selected files:', selectedFiles); // Log selected files
    console.log('Remarks:', remarks); // Log remarks

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('directory', file);
    });

    const queryParams = `consultationId=5&remarks=${encodeURIComponent(remarks)}`;

    try {
      console.log('Sending request with query params:', queryParams); // Log query params
      const response = await axios.post(`http://localhost:9191/dicom/upload?${queryParams}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Upload successful:', response.data);
      onClose(); // Close the modal after successful upload
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFiles(Array.from(files));
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>Close</button>
        {/* Textarea for remarks */}
        <textarea
          placeholder="Enter remarks"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          rows={5} 
          cols={50}
        />
        {/* File input field */}
        <input type="file" onChange={handleFileChange} directory="" webkitdirectory="" />
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
};

export default LabUpload;
