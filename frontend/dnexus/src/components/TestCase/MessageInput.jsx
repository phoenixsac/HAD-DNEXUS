// import React, { useState } from 'react';

// function MessageInput({ users, onSubmit }) {
//   const [message, setMessage] = useState('');
//   const [receiverId, setReceiverId] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!message.trim() || !receiverId.trim()) return;
//     onSubmit({ message, receiverId });
//     setMessage('');
//     setReceiverId('');
//   };

//   return (
//     <form className="message-input-form" onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Type your message here..."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <select
//         value={receiverId}
//         onChange={(e) => setReceiverId(e.target.value)}
//       >
//         <option value="">All</option>
//         {users.map(user => (
//           <option key={user.id} value={user.id}>{user.name}</option>
//         ))}
//       </select>
//       <button type="submit">Send</button>
//     </form>
//   );
// }

// export default MessageInput;


// import React, { useState } from 'react';

// function MessageInput({ users, onSubmit }) {
//   const [message, setMessage] = useState('');
//   const [receiverId, setReceiverId] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!message.trim() || !receiverId.trim()) return;
//     onSubmit({ message, receiverId });
//     setMessage(''); // Reset message input field
//     setReceiverId(''); // Reset receiver select field
//   };

//   return (
//     <form className="message-input-form" onSubmit={handleSubmit}>
//       <input className='message-text'
//         type="text"
//         placeholder="Type your message here..."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <select
//         value={receiverId}
//         onChange={(e) => setReceiverId(e.target.value)}
//       >
//         <option value="">All</option>
//         {users.map(user => (
//           <option key={user.id} value={user.id}>{user.name}</option>
//         ))}
//       </select>
//       <button type="submit">Send</button>
//     </form>
//   );
// }

// export default MessageInput;


// import React, { useState } from 'react';
// import "./MessageInput.css";

// function MessageInput({ users, onSubmit }) {
//   const [message, setMessage] = useState('');
//   const [receiverId, setReceiverId] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!message.trim() || !receiverId.trim()) return;
//     onSubmit({ message, receiverId });
//     setMessage(''); // Reset message input field
//     setReceiverId(''); // Reset receiver select field
//   };

//   const handleConnect = () => {
//     // Handle connect button click
//     // You can implement the functionality here
//   };

//   return (
    
//       <form className="message-input-form" onSubmit={handleSubmit}>
//     <div className="message-input-container">
//       <div className='message-input'>
//       <input 
//         type="text"
//         placeholder="Type your message here..."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       </div>
      
//       {/* <select
//         value={receiverId}
//         onChange={(e) => setReceiverId(e.target.value)}
//       >
//         <option value="">All</option>
//         {users.map(user => (
//           <option key={user.id} value={user.id}>{user.name}</option>
//         ))}
//       </select> */}
//       <div className='connect-div'>
//         <button className="connect-button" onClick={handleConnect}>Connect</button>
//         </div>
      
//       <button className='send-button' type="submit">Send</button>
//     </div>
//   </form>
    
//   );
// }

// export default MessageInput;



import React, { useState } from 'react';
import "./MessageInput.css";
import { sendPrivateMessage } from './WebSocket'; 
import { useParams } from 'react-router-dom';

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
      // let senderId;
      // let receiverId;
      // // Get userType from sessionStorage
      // const userType = sessionStorage.getItem('userType');
  
      // // If userType is "doctor"
      // if (userType === "doctor") {
      //   // Get senderId from local storage
      //   senderId = localStorage.getItem('actorId');
  
      //   // Fetch receiverId from backend using consultationId
      //   const idParam = testId ? `consultationId=${testId}` : `consultationId=${consultationId}`;
      //   const response = await fetch(`http://localhost:8085/core/consultation/radiologist-detail-for-consultation?${idParam}`);
      //   if (!response.ok) {
      //     throw new Error('Failed to fetch receiverId');
      //   }
      //   const data = await response.json();
      //   receiverId = data.id;
         
        
      // }
      // else if (userType === "radiologist") {
      //   senderId = localStorage.getItem('actorId');
  
      //   // Fetch receiverId from backend using consultationId
      //   const idParam = testId ? `consultationId=${testId}` : `consultationId=${consultationId}`;
      //   const response = await fetch(`http://localhost:8085/core/consultation/doctor-details-by-consultation?${idParam}`);
      //   if (!response.ok) {
      //     throw new Error('Failed to fetch receiverId');
      //   }
      //   const data = await response.json();
      //   receiverId = data.id;
        
      // } 
      // Handle other userTypes here
  
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
      
     {!connected && <button className="connect-button" onClick={handleConnectClick}>Connect</button>}

      </div>
      
      
      {/* Send button */}
      <button className="send-button" onClick={handleSendClick}>Send</button>
      </div>
    </form>
  );
}

export default MessageInput;



