

import { over } from 'stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;
let radId = null;

// export const connectToChat = (senderId, receiverId, consultationId, onMessageReceived, onNewMessage) => {
//   const Sock = new SockJS('http://localhost:8085/chat');
//   stompClient = over(Sock);
//   stompClient.connect({}, () => onConnected(senderId, receiverId, consultationId, onMessageReceived, onNewMessage), onError);
// };

export const connectToChat = (senderId, receiverId, consultationId, onMessageReceived, onNewMessage) => {
  if (stompClient && stompClient.connected) {
    // If already connected, disconnect first
    stompClient.disconnect(() => {
      // Once disconnected, connect again
      establishConnection(senderId, receiverId, consultationId, onMessageReceived, onNewMessage);
    });
  } else {
    // If not connected, just establish connection
    establishConnection(senderId, receiverId, consultationId, onMessageReceived, onNewMessage);
  }
};

const establishConnection = (senderId, receiverId, consultationId, onMessageReceived, onNewMessage) => {
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
  const userType = sessionStorage.getItem('userType');
  // Subscribe to message topic
  if (userType === "doctor"){
  stompClient.subscribe(`/topic/${consultationId}/radiologist/${receiverId}/messages`, (payload) => onPrivateMessage(payload, onNewMessage));
  }
  else if (userType === "radiologist") {
    stompClient.subscribe(`/topic/${consultationId}/radiologist/${senderId}/messages`, (payload) => onPrivateMessage(payload, onNewMessage));
  }
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
  const userType = sessionStorage.getItem('userType');
  
  if (userType === "doctor"){
  radId=receiverId; 
  console.log("radid" ,radId)
  }
  else if (userType === "radiologist") {
  radId=senderId;
  }
  const response = await fetch(`http://localhost:8085/chat/get-messages/${consultationId}/radiologist/${radId}`);
  console.log('Fetched messages function:', response);
  if (!response.ok) {
    throw new Error('Failed to fetch older messages');
  }
  
  return response;
};


export const sendPrivateMessage = (senderId, receiverId, messageContent, consultationId) => {
    if (stompClient) {
      const senderType = "doctor";
      const receiverType = "radiologist";
      
      const message = {
        senderId,
        receiverId,
        senderType,
        receiverType,
        messageContent
      };
      const contentLength = messageContent.length;
      console.log("Message content:", messageContent);
      console.log("Message content length:", contentLength);
      const userType = sessionStorage.getItem('userType');

      
      if (userType === "doctor"){
      stompClient.send(`/app/chat/${consultationId}/radiologist/${receiverId}`, {}, JSON.stringify(message));
      }
      
      else if (userType === "radiologist") {
        stompClient.send(`/app/chat/${consultationId}/radiologist/${senderId}`, {}, JSON.stringify(message));
      }

    }
  };
