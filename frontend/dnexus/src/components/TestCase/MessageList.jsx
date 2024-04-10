import React from 'react';

function Message({ sender, receiver, content }) {
  return (
    <div className="message">
    <strong>{sender}: @{receiver}</strong>: {content}
  </div>
  );
}

function MessageList({ messages }) {
  return (
    <div>
      {messages.map((msg, index) => (
        <Message
          key={index}
          sender={msg.sender}
          receiver={msg.receiver}
          content={msg.message} // Update to display the message content
        />
      ))}
    </div>
  );
}

export default MessageList;
