// import React, { useState } from 'react';
// import MessageInput from './MessageInput';
// import MessageList from './MessageList';
// import './MessagingPage.css'; // Importing the CSS file

// function MessagingPage() {
//   // Dummy user data
//   const users = [
//     { id: 'doctor', name: 'Doctor' },
//     { id: 'radiologist1', name: 'Radiologist 1' },
//     { id: 'radiologist2', name: 'Radiologist 2' }
//   ];

//   const [messages, setMessages] = useState([]);
//   const [messageInput, setMessageInput] = useState('');

//   const handleMessageSubmit = (newMessage) => {
//     const { message, receiverId } = newMessage;
//     const sender = 'Doctor'; // Assuming the sender is always the doctor for now
//     const receiver = receiverId === '' ? 'All' : users.find(user => user.id === receiverId)?.name || 'Unknown';
//     const newMessages = [...messages, { sender, receiver, message }];
//     setMessages(newMessages);
//     setMessageInput(''); // Reset message input
//   };

//   return (
//     <div className="messaging-container">
//       <h2>Messaging</h2>
//       <MessageInput
//         users={users}
//         onSubmit={handleMessageSubmit}
//         messageInput={messageInput}
//         setMessageInput={setMessageInput}
//       />
//       <MessageList messages={messages} />
//     </div>
//   );
// }

// export default MessagingPage;


// 

import React, { useState } from 'react';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import { useParams } from 'react-router-dom';
import { connectToChat } from './WebSocket'; // Assuming you have a separate file for WebSocket connection
import './MessagingPage.css'; // Importing the CSS file


function MessagingPage() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [connected, setConnected] = useState(false);
  const { consultationId, testId } = useParams(); 
  
  
  

  // const handleConnect = () => {
    
  //   // Connect to WebSocket
  //   connectToChat(6, 1, consultationId || testId, handleMessagesReceived, handleMessageSubmit); // Hardcoded senderId, receiverId, and consultationId
  // };


  const handleConnect = async () => {
    try {
      let senderId;
      let receiverId;
      
      // Get userType from sessionStorage
      const userType = sessionStorage.getItem('userType');
  
      // If userType is "doctor"
      if (userType === "doctor") {
        // Get senderId from local storage
        senderId = localStorage.getItem('actorId');
  
        // Fetch receiverId from backend using consultationId
        const idParam = testId ? `consultationId=${testId}` : `consultationId=${consultationId}`;
        const response = await fetch(`http://localhost:8085/core/consultation/radiologist-detail-for-consultation?${idParam}`);
        if (!response.ok) {
          throw new Error('Failed to fetch receiverId');
        }
        const data = await response.json();
        receiverId = data.id;
      }

      else if (userType === "radiologist") {
        senderId = localStorage.getItem('actorId');
  
        // Fetch receiverId from backend using consultationId
        const idParam = testId ? `consultationId=${testId}` : `consultationId=${consultationId}`;
        const response = await fetch(`http://localhost:8085/core/consultation/doctor-details-by-consultation?${idParam}`);
        if (!response.ok) {
          throw new Error('Failed to fetch receiverId');
        }
        const data = await response.json();
        receiverId = data.id;
      
      } 
      // Handle other userTypes here
  
      // Connect to WebSocket
      connectToChat(senderId, receiverId, consultationId || testId, handleMessagesReceived, handleMessageSubmit);
    } catch (error) {
      console.error('Error handling connection:', error);
      // Handle error as needed
    }
  };
  
  const handleMessagesReceived = (olderMessages) => {
    // Update message state with older messages
    setMessages(olderMessages);
    setConnected(true); 
  };
  
  const handleMessageSubmit = (newMessage) => {
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };
  // Dummy user data
  const users = [
    { id: 'doctor', name: 'Doctor' },
    { id: 'radiologist1', name: 'Radiologist 1' },
    { id: 'radiologist2', name: 'Radiologist 2' }
  ];

  return (
    <div className="messaging-container">
      <h2>Messaging</h2>
      <MessageList messages={messages} />
      <MessageInput
        users={users}
        onSubmit={handleMessageSubmit}
        messageInput={messageInput}
        setMessageInput={setMessageInput}
        onConnect={handleConnect} // Pass connect handler to MessageInput component
        connected={connected} 
      />
    </div>
  );
}

export default MessagingPage;
