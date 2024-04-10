import React, { useEffect, useState } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import "./Chatroom.css";

let stompClient = null;

const ChatRoom = (props) => {
    const [privateChats, setPrivateChats] = useState([]);
    const [userData, setUserData] = useState({
        senderId: '',
        receiverId: '',
        consultationId: 123,
        connected: false,
        message: ''
    });

    const connect = () => {
        let Sock = new SockJS('http://localhost:8085/chat');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = async () => {
        setUserData({ ...userData, "connected": true });
        try {
            const response = await axios.get(`http://localhost:8085/chat/get-messages/${props.consultationId}`);
            console.log(response.data);
            // Update privateChats state with the fetched messages
            setPrivateChats(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
        stompClient.subscribe(`/topic/${props.consultationId}/messages`, onPrivateMessage);
    }

    const onPrivateMessage = (payload) => {
        const payloadData = JSON.parse(payload.body);
        setPrivateChats(prevChats => [...prevChats, payloadData]);
    }

    const onError = (err) => {
        console.log(err);
    }

    const handleMessage = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, "message": value });
    }

    const sendPrivateValue = () => {
        if (stompClient) {
            const message = {
                consultationId: userData.consultationId,
                senderId: userData.senderId,
                receiverId: userData.receiverId,
                messageContent: userData.message
            };

            stompClient.send(`/app/chat/${props.consultationId}`, {}, JSON.stringify(message));
            setUserData({ ...userData, "message": "" });
        }
    }

    const handleUsername = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, "senderId": value });
    }

    const handleReceivername = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, "receiverId": value });
    }

    const registerUser = () => {
        connect();
    }

    return (
        <div className="container">
            {userData.connected ?
                <div className="chat-box">
                    <div className="chat-content">
                        <ul className="chat-messages">
                            {privateChats.map((chat, index) => (

                                <li className={`message ${chat.senderId == userData.senderId ? "self" : ""}`} key={index}>

                                    {chat.senderId != userData.senderId && <div className="avatar">{chat.senderId}</div>}
                                    <div className={`message-data ${chat.senderId === userData.senderId ? "self" : ""}`}>{chat.messageContent}</div>
                                    {chat.senderId == userData.senderId && <div className="avatar self">{chat.senderId}</div>}
                                </li>
                            ))}
                        </ul>

                        <div className="send-message">
                            <input type="text" className="input-message" placeholder="Enter your message" value={userData.message} onChange={handleMessage} />
                            <button type="button" className="send-button" onClick={sendPrivateValue}>Send</button>
                        </div>
                    </div>
                </div>
                :
                <div className="register">
                    <input
                        id="user-name"
                        placeholder="Enter your senderId"
                        name="userName"
                        value={userData.senderId}
                        onChange={handleUsername}
                        margin="normal"
                    />
                    <input
                        id="receiver-name"
                        placeholder="Enter receiver's receiverId"
                        name="receiverName"
                        value={userData.receiverId}
                        onChange={handleReceivername}
                        margin="normal"
                    />
                    <button type="button" onClick={registerUser}>
                        Connect
                    </button>
                </div>}
        </div>
    )
}

export default ChatRoom;