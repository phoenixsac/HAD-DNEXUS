import React from 'react';
import './ChatPopup.css';

const ChatPopup = ({ roomName, onClose }) => {
  return (
    <div className="chat-popup">
      <div className="header">
        <span className="room-name">{roomName}</span>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
      <div className="chat-messages">
        {/* Display chat messages here */}
      </div>
      <div className="input-area">
        <textarea placeholder="Type your message..." />
        <button>Send</button>
      </div>
    </div>
  );
};

export default ChatPopup;
