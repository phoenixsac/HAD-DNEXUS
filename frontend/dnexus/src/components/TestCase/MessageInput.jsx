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


import React, { useState } from 'react';
import "./MessageInput.css";

function MessageInput({ users, onSubmit }) {
  const [message, setMessage] = useState('');
  const [receiverId, setReceiverId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim() || !receiverId.trim()) return;
    onSubmit({ message, receiverId });
    setMessage(''); // Reset message input field
    setReceiverId(''); // Reset receiver select field
  };

  return (
    
      <form className="message-input-form" onSubmit={handleSubmit}>
    <div className="message-input-container">
      <div className='message-input'>
      <input 
        type="text"
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      </div>
      
      <select
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
      >
        <option value="">All</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
      <button type="submit">Send</button>
    </div>
  </form>
    
  );
}

export default MessageInput;


