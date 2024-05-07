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

// WebSocketConnection.js

import { over } from 'stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;

export const connectToChat = (senderId, receiverId, consultationId, onMessageReceived, onNewMessage) => {
  const Sock = new SockJS('http://localhost:8085/chat');
  stompClient = over(Sock);
  stompClient.connect({}, () => onConnected(senderId, receiverId, consultationId, onMessageReceived, onNewMessage), onError);
};

const onConnected = async (senderId, receiverId, consultationId, onMessageReceived, onNewMessage) => {

try {

    const response = await fetchOlderMessages(senderId, receiverId, consultationId);
    
    if (response.ok) {
      const olderMessages = await response.json();
      console.log('Fetched older messages:', olderMessages);
      

      onMessageReceived(olderMessages);
    } else {
      console.error('Failed to fetch older messages:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching older messages:', error);
  }

  // Subscribe to message topic
  stompClient.subscribe(`/topic/${consultationId}/messages`, (payload) => onPrivateMessage(payload, onNewMessage));
};

export const onPrivateMessage = (payload, onNewMessage) => {
  // Handle incoming messages
  console.log('paload', payload);
  const payloadData = JSON.parse(payload.body);
  onNewMessage(payloadData);

  
};

const onError = (err) => {
  console.error(err);
};

const fetchOlderMessages = async (senderId, receiverId, consultationId) => {
  // Implement logic to fetch older messages from the server
  // Example using fetch API:
  const response = await fetch(`http://localhost:8085/chat/get-messages/${consultationId}`);
  console.log('Fetched messages function:', response);
  if (!response.ok) {
    throw new Error('Failed to fetch older messages');
  }
  
  return response;
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
