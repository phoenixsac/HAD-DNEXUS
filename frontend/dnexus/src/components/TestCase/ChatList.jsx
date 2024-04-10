import React from 'react';
import './ChatList.css';

const ChatList = () => {
  // Dummy data for multiple rooms
  const chatRooms = [
    { roomName: 'Room 1', members: ['User1', 'User2', 'User3'], date: '2024-04-06' },
    { roomName: 'Room 2', members: ['User4', 'User5'], date: '2024-04-05' },
    { roomName: 'Room 3', members: ['User6', 'User7', 'User8'], date: '2024-04-04' },
    { roomName: 'Room 4', members: ['User9', 'User10', 'User11'], date: '2024-04-03' }
    // Add more rooms as needed
  ];

  const handleRoomClick = (roomName) => {
    alert(`Clicked on chat room: ${roomName}`);
  };

  return (
    <div className="chat-list-container">
      {chatRooms.map((room, index) => (
        <div key={index} className="chat-list-item" onClick={() => handleRoomClick(room.roomName)}>
           <div className='room-info'>
          <div className="room-name">{room.roomName}</div>
          <div className="members">Members: {room.members.join(', ')}</div>
          </div>
          <div className="date">Date: {room.date}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;


// import React, { useState } from 'react';
// import './ChatList.css';
// import ChatPopup from './ChatPopup';

// const ChatList = () => {
//   const [currentRoom, setCurrentRoom] = useState(null);

//   const handleRoomClick = (roomName) => {
//     setCurrentRoom(roomName);
//   };

//   const handleCloseChat = () => {
//     setCurrentRoom(null);
//   };

//   // Dummy data for multiple rooms
//   const chatRooms = [

//     { roomName: 'Room 1', members: ['User1', 'User2', 'User3'], date: '2024-04-06' },
//     { roomName: 'Room 2', members: ['User4', 'User5'], date: '2024-04-05' },
//     { roomName: 'Room 3', members: ['User6', 'User7', 'User8'], date: '2024-04-04' },
//     { roomName: 'Room 4', members: ['User9', 'User10', 'User11'], date: '2024-04-03' }
//     // Your chat room data here
//   ];

//   return (
//     <div className="chat-list-container">
//       {chatRooms.map((room, index) => (
//         <div key={index} className="chat-room-item" onClick={() => handleRoomClick(room.roomName)}>
//           <div className="room-info">
//             <div className="room-name">{room.roomName}</div>
//             <div className="members">Members: {room.members.join(', ')}</div>
//           </div>
//           <div className="date">{room.date}</div>
//         </div>
//       ))}
//       {currentRoom && <ChatPopup roomName={currentRoom} onClose={handleCloseChat} />}
//     </div>
//   );
// };

// export default ChatList;
