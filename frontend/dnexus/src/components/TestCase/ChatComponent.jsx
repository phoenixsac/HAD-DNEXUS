// ChatComponent.jsx

import React, { useState, useEffect } from 'react';
import './ChatComponent.css';
import { useParams } from 'react-router-dom';
import MessagingPage from './MessagingPage';

const ChatComponent = () => {
  const [radiologists, setRadiologists] = useState([]);
  const [selectedRadiologistId, setSelectedRadiologistId] = useState(null); // State to store selected radiologist ID
  const { testId, consultationId } = useParams();
  
  useEffect(() => {
    // Fetch radiologists from API
    const idParam = testId ? testId : consultationId;
    fetch(`http://localhost:8085/core/consultation/${idParam}/radiologists`)
      .then(response => response.json())
      .then(data => setRadiologists(data))
      .catch(error => console.error('Error fetching radiologists:', error));
  }, []);

  const handleRadiologistClick = (radiologist) => {
    setSelectedRadiologistId(radiologist.id); // Set selected radiologist's ID
  };

  return (
    <div className="chat-container">
      <div className="radiologist-list">
        <h2>Radiologists</h2>
        <ul>
          {radiologists.map(radiologist => (
            <li key={radiologist.id} onClick={() => handleRadiologistClick(radiologist)}>
              {radiologist.fullName}
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-window">
        <h2>Chat</h2>
        <MessagingPage selectedRadiologistId={selectedRadiologistId} /> {/* Pass selected radiologist's ID as prop */}
      </div>
    </div>
  );
};

export default ChatComponent;
