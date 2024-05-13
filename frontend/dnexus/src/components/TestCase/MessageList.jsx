// import React from 'react';

// function Message({ sender, receiver, content }) {
//   return (
//     <div className="message">
//     <strong>{sender}: @{receiver}</strong>: {content}
//   </div>
//   );
// }

// function MessageList({ messages }) {
//   return (
//     <div>
//       {messages.map((msg, index) => (
//         <Message
//           key={index}
//           sender={msg.sender}
//           receiver={msg.receiver}
//           content={msg.message} // Update to display the message content
//         />
//       ))}
//     </div>
//   );
// }

// export default MessageList;


// import React from 'react';
// import "./MessageList.css"

// function Message({ sender, receiver, content }) {
//   return (
//     <div className="message">
//       <strong>{sender}: @{receiver}</strong>: {content}
//     </div>
//   );
// }

// function MessageList({ messages }) {
//   console.log('Messages new:', messages);
//   return (
//     <div className="message-list-container">
      
      
//       {messages.map((msg, index) => (
//         <Message
//           key={index}
//           sender={msg.senderId}
//           receiver={msg.receiverId}
//           content={msg.messageContent}
//         />
//       ))}
//     </div>
//   );
// }

// export default MessageList;



import React, { useState, useEffect } from 'react';
import "./MessageList.css";

function Message({ senderName, receiverName, content,setMessagesLoaded}) {

  useEffect(() => {
   
      setMessagesLoaded(true);
    
  }, [setMessagesLoaded]);
  return (
  
    
    <div className="message">
      <strong>{senderName}: @{receiverName}</strong>: <text>{content}</text>
    </div>
    
  );
}

function MessageList({ messages,fetchMessages }) {
  const [senders, setSenders] = useState({});
  const [receivers, setReceivers] = useState({});
  const [messagesLoaded, setMessagesLoaded] = useState(false);

  useEffect(() => {
    async function fetchSenderNames() {
      const senderDetails = {};

      // Iterate through each message object inside the messages array
      for (let i = 0; i < messages.length; i++) {
        const msg = messages[i];
        const senderId = msg.senderId;
        const senderType = msg.senderType;


        let apiUrl;
        if (senderType === "doctor") {
          apiUrl = `http://localhost:8085/core/professional/doctor-details?doctorId=${senderId}`;
        } else if (senderType === "radiologist") {
          apiUrl = `http://localhost:8085/core/professional/radiologist-details?radiologistId=${senderId}`;
        }

        if (!apiUrl) continue; // Skip if apiUrl is not constructed

        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          senderDetails[senderId] = data.name;
        } catch (error) {
          console.error('Error fetching sender details:', error);
        }
      }

      setSenders(senderDetails);
    }

    fetchSenderNames();
  }, [messages]); // Run effect whenever messages change


  useEffect(() => {
    async function fetchReceiverNames() {
      const receiverDetails = {};

      // Iterate through each message object inside the messages array
      for (let i = 0; i < messages.length; i++) {
        const msg = messages[i];
        const receiverId = msg.receiverId;
        const receiverType = msg.receiverType;


        let apiUrl;
        if (receiverType === "doctor") {
          apiUrl = `http://localhost:8085/core/professional/doctor-details?doctorId=${receiverId}`;
        } else if (receiverType === "radiologist") {
          apiUrl = `http://localhost:8085/core/professional/radiologist-details?radiologistId=${receiverId}`;
        }

        if (!apiUrl) continue; // Skip if apiUrl is not constructed

        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          receiverDetails[receiverId] = data.name;
        } catch (error) {
          console.error('Error fetching receiver details:', error);
        }
      }

      setReceivers(receiverDetails);
    }

    fetchReceiverNames();
  }, [messages]); // Run effect whenever messages change

  
 

  const handleLoadMoreClick = () => {
    // Call fetchMessages when "Load More" is clicked
    fetchMessages();
  };

  return (
    <div className="message-list-container">
      
      {messagesLoaded && (<div className="load-more" onClick={handleLoadMoreClick}>Load Previous Messages</div>)}
      {/* <div className="load-more" onClick={handleLoadMoreClick}>Load Previous More</div> */}
    
      {messages.map((msg, index) => (
        
        <Message
          key={index}
          senderName={senders[msg.senderId]}
          receiverName={receivers[msg.receiverId]}
          content={msg.messageContent}
          setMessagesLoaded={setMessagesLoaded}
        />
      ))}
    </div>
  );
}

export default MessageList;


