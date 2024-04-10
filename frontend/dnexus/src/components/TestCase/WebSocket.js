// import { over } from 'stompjs';
// import SockJS from 'sockjs-client';

// let stompClient = null;

// export const connectToChat = (senderId, receiverId, consultationId) => {
//   const Sock = new SockJS('http://localhost:8085/chat');
//   stompClient = over(Sock);
//   stompClient.connect({}, () => onConnected(senderId, receiverId, consultationId), onError);
// };

// const onConnected = async (senderId, receiverId, consultationId) => {
//   try {
//     // Fetch messages or any other initialization logic
//   } catch (error) {
//     console.error('Error fetching messages:', error);
//   }
//   stompClient.subscribe(`/topic/${consultationId}/messages`, onPrivateMessage);
// };

// const onPrivateMessage = (payload) => {
//   // Handle incoming messages
// };

// const onError = (err) => {
//   console.error(err);
// };


// WebSocketConnection.js

import { over } from 'stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;

export const connectToChat = (senderId, receiverId, consultationId) => {
  const Sock = new SockJS('http://localhost:8085/chat');
  stompClient = over(Sock);
  stompClient.connect({}, () => onConnected(senderId, receiverId, consultationId), onError);
};

const onConnected = async (senderId, receiverId, consultationId) => {
  // Fetch messages or any other initialization logic
  stompClient.subscribe(`/topic/${consultationId}/messages`, onPrivateMessage);
};

const onPrivateMessage = (payload) => {
  // Handle incoming messages
};

const onError = (err) => {
  console.error(err);
};

export const sendPrivateMessage = (senderId, receiverId, messageContent, consultationId) => {
    if (stompClient) {
      const message = {
        senderId,
        receiverId,
        messageContent
      };
  
      stompClient.send(`/app/chat/${consultationId}`, {}, JSON.stringify(message));
    }
  };
