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

// import React, { useState } from 'react';
// import MessageInput from './MessageInput';
// import MessageList from './MessageList';
// import { useParams } from 'react-router-dom';
// import { connectToChat } from './WebSocket'; // Assuming you have a separate file for WebSocket connection
// import './MessagingPage.css'; // Importing the CSS file


// function MessagingPage() {
//   const [messages, setMessages] = useState([]);
//   const [messageInput, setMessageInput] = useState('');
//   const [connected, setConnected] = useState(false);
//   const { consultationId, testId } = useParams(); 
  
  
  

//   // const handleConnect = () => {
    
//   //   // Connect to WebSocket
//   //   connectToChat(6, 1, consultationId || testId, handleMessagesReceived, handleMessageSubmit); // Hardcoded senderId, receiverId, and consultationId
//   // };


//   const handleConnect = async () => {
//     try {
//       let senderId;
//       let receiverId;
      
//       // Get userType from sessionStorage
//       const userType = sessionStorage.getItem('userType');
  
//       // If userType is "doctor"
//       if (userType === "doctor") {
//         // Get senderId from local storage
//         senderId = localStorage.getItem('actorId');
  
//         // Fetch receiverId from backend using consultationId
//         const idParam = testId ? `consultationId=${testId}` : `consultationId=${consultationId}`;
//         const response = await fetch(`http://localhost:8085/core/consultation/radiologist-detail-for-consultation?${idParam}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch receiverId');
//         }
//         const data = await response.json();
//         receiverId = data.id;
//       }

//       else if (userType === "radiologist") {
//         senderId = localStorage.getItem('actorId');
  
//         // Fetch receiverId from backend using consultationId
//         const idParam = testId ? `consultationId=${testId}` : `consultationId=${consultationId}`;
//         const response = await fetch(`http://localhost:8085/core/consultation/doctor-details-by-consultation?${idParam}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch receiverId');
//         }
//         const data = await response.json();
//         receiverId = data.id;
      
//       } 
//       // Handle other userTypes here
  
//       // Connect to WebSocket
//       connectToChat(senderId, receiverId, consultationId || testId, handleMessagesReceived, handleMessageSubmit);
//     } catch (error) {
//       console.error('Error handling connection:', error);
//       // Handle error as needed
//     }
//   };
  
//   const handleMessagesReceived = (olderMessages) => {
//     // Update message state with older messages
//     setMessages(olderMessages);
//     setConnected(true); 
//   };
  
//   const handleMessageSubmit = (newMessage) => {
//     setMessages(prevMessages => [...prevMessages, newMessage]);
//   };
//   // Dummy user data
//   const users = [
//     { id: 'doctor', name: 'Doctor' },
//     { id: 'radiologist1', name: 'Radiologist 1' },
//     { id: 'radiologist2', name: 'Radiologist 2' }
//   ]

//   return (
//     <div className="messaging-container">
//       <h2>Messaging</h2>
//       <MessageList messages={messages} />
//       <MessageInput
//         users={users}
//         onSubmit={handleMessageSubmit}
//         messageInput={messageInput}
//         setMessageInput={setMessageInput}
//         onConnect={handleConnect} 
//         connected={connected} 
//       />
//     </div>
//   );
// }

// export default MessagingPage;



import React, { useState, useEffect } from 'react';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import { useParams } from 'react-router-dom';
import { connectToChat } from './WebSocket'; // Assuming you have a separate file for WebSocket connection
import './MessagingPage.css'; // Importing the CSS file
import { fetchOlderMessages } from './WebSocket';


function MessagingPage({ selectedRadiologistId }) {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [connected, setConnected] = useState(false);
  const { consultationId, testId } = useParams(); 
  const [senderId, setSenderId] = useState(null);
  const [receiverId, setReceiverId] = useState(null);
  const [page, setPage] = useState(0); // Track the current page of messages
  const [loadingMore, setLoadingMore] = useState(false); // Track whether loading more messages is in progress
  
  
  

  
  useEffect(() => {
    const handleConnect = async () => {
      try {
        let sender;
        let receiver;

        // Get senderId from local storage
        const userType = sessionStorage.getItem('userType');

        if (userType === "doctor") {
        sender = localStorage.getItem('actorId');

        // Set receiverId to the selected radiologist ID
        receiver = selectedRadiologistId;
        }

        else if (userType === "radiologist") {
        sender = selectedRadiologistId;

        const idParam = testId ? `consultationId=${testId}` : `consultationId=${consultationId}`;
        const response = await fetch(`http://localhost:8085/core/consultation/doctor-details-by-consultation?${idParam}`);
        if (!response.ok) {
          throw new Error('Failed to fetch receiverId');
        }
        const data = await response.json();
        receiver = data.id;
        console.log("recriver is", receiver);


        }

        // Connect to WebSocket
        connectToChat(sender, receiver, consultationId || testId, handleMessagesReceived, handleMessageSubmit,page);
        setSenderId(sender);
        setReceiverId(receiver);
        setPage(prevPage => prevPage + 1);
      } catch (error) {
        console.error('Error handling connection:', error);
        // Handle error as needed
      }
    };

    if (selectedRadiologistId) {
      handleConnect();
    }
  }, [consultationId, testId, selectedRadiologistId]);

  const fetchMessages = async () => {
    try {
      setLoadingMore(true);
      console.log("consulationid in messaging",consultationId || testId);
      const response = await fetchOlderMessages(senderId, receiverId, consultationId || testId, page); // Adjust size as needed
      if (response.ok) {
        const olderMessages = await response.json();
        setMessages(prevMessages => [...olderMessages, ...prevMessages]);
        // setMessages(prevMessages => [...prevMessages, ...olderMessages]);
        setPage(prevPage => prevPage + 1);
      } else {
        console.error('Failed to fetch older messages:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching older messages:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (!loadingMore) {
      fetchMessages();
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
  ]

  return (
    <div className="messaging-container">
      {/* <h2>Messaging</h2> */}
      <MessageList messages={messages} fetchMessages={fetchMessages} />
      {/* {loadingMore ? (
        <div>Loading...</div>
      ) : (
        <button onClick={handleLoadMore}>Load More</button>
      )} */}
      <MessageInput
        users={users}
        onSubmit={handleMessageSubmit}
        messageInput={messageInput}
        setMessageInput={setMessageInput}
        onConnect={() => {}}  
        connected={connected} 
        senderId={senderId}
        receiverId={receiverId}
        
      />
    </div>
  );
}

export default MessagingPage;
