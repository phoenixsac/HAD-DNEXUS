import React, { useState } from 'react';
import "./MessageInput.css";
import { sendPrivateMessage } from './WebSocket'; 
import { useParams } from 'react-router-dom';

import { IoSend } from "react-icons/io5";

function MessageInput({senderId,receiverId, users, onSubmit, onConnect ,connected}) {
  const [message, setMessage] = useState('');
  // const [receiverId, setReceiverId] = useState('');
  const { consultationId, testId } = useParams(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    // const consultationId = 1
    // if (!message.trim() || !receiverId.trim()) return;
    // onSubmit({ message, receiverId });
    // sendPrivateMessage('1', '2', message, consultationId); // Pass consultationId
    // // onSubmit();
    // // setMessage(''); // Reset message input field
    // setReceiverId(''); // Reset receiver select field
  };

  const handleConnectClick = () => {
    // Call the connect handler passed from the parent component
    onConnect();
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  
  // const handleSendClick = (e) => {
    
  //   // const consultationId = 1
  //   if (!message.trim()) return;
  //   // onSubmit({ message, receiverId });
  //   sendPrivateMessage('6', '1', message, consultationId || testId); // Pass consultationId
  //   setMessage(''); 
  //   // Reset message input field
  // };
  // Other input handlers and JSX here...

  const handleSendClick = async (e) => {
    try {
     
      // Reset message input field
      if (!message.trim()) return;
        // Send private message
      console.log("receiver from input", receiverId);
      sendPrivateMessage(senderId, receiverId, message, consultationId || testId);
      setMessage(''); 
    } catch (error) {
      console.error('Error handling sending message:', error);
      // Handle error as needed
    }
  };
  

  return (
    <form className="message-input-form" onSubmit={handleSubmit}>
      <div className='message-input-container'>

      
      <div className='message-input'>
        {/* Input fields for message and receiver */}
      <input 
        type="text"
        placeholder="Type your message here..."
        value={message}
        onChange={handleMessageChange}
      />
      </div>
      
      <div className='connect-div'>
      {/* Connect button */}
      {/* <button className="connect-button" onClick={handleConnectClick}>Connect</button> */}
      
     {/* {!connected && <button className="connect-button" onClick={handleConnectClick}>Connect</button>} */}

      </div>
      
      
      {/* Send button */}
      <div className="send-button" onClick={handleSendClick}><IoSend /></div>
      </div>
    </form>
  );
}

export default MessageInput;



