import React, { useEffect , useState, useRef } from "react";
import "./message.css";
import { localChat } from '../chats/localChat';
import { localAuth } from "../../components/Login/localAuth";
import { useLocation } from "react-router-dom";
import Input from "../../components/input/input";
import Button from "../../components/button/button";


const Message= () => {

    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const chatId = localChat.getChatId();
    const [text, setText] = useState("");
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const location = useLocation();
    const developerName = location.state?.developerName;
    const fetchUserMessages = async () => {
        try {
        const response = await fetch(`http://127.0.0.1:8000/api/message/${chatId}`);
        const data = await response.json();
        if (data.message) {
            setError(data.message);
        } else {
            setMessages(data.messages);
        }
        } catch (error) {
            setError('Failed to fetch messages.');
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        fetchUserMessages();
    }, [chatId]);

    const sendMessage = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    user_id: localAuth.getUserId(),
                    message: text,
                }),
            });
            const data = await response.json();
            const newMessages = data;
            setMessages([...messages, newMessages]);
            setText("");
            scrollToBottom();
        } catch (error) {
            setError('Failed to send message.');
            console.error('Error sending message:', error);
        }
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="message-container">
            <h1>{`${developerName}`}</h1>
            {error && <p>{error}</p>}
            <div className="messages">
                {messages.map((message) => (
                    <div 
                        key={message.id} 
                        className={`message ${message.user_id == localAuth.getUserId() ? 'sent' : 'received'}`}
                    >
                        <p className="message-text">{message.message}</p>
                    </div>
                ))}
                <div ref={messagesEndRef} /> 
            </div>
            <div className="input-container">
                <Input 
                    placeholder="Type your message here..."
                    onTextChange={(e) => setText(e.target.value)}
                    style={{ width: "82vw" , height: "35px" , margin: "-2px"}}
                    value={text}
                />
                <Button 
                    text="Send"
                    onMouseClick={() => {
                        sendMessage();
                    }
                    }
                    style={{ margin: "-5px"}}
                />
            </div>
        </div>
    );
};
export default Message;