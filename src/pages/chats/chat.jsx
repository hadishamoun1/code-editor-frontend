import React, { useState, useEffect } from "react";
import "./chat.css";
import { localAuth } from "../../components/Login/localAuth";
import Button from "../../components/button/button";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [error, setError] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const userId = localAuth.getUserId();
  const getChats = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/chat/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      const chatArray = data.chats;
      if(!data.message){
        setChats(chatArray);      }
    } catch (error) {
      setError("Failed to fetch chats.");
      console.error(error);
    }

  };
  const fetchUserDetails = async (chats) => {
    try {
      const details = await Promise.all(chats.map(async (chat) => {
        let url = `http://127.0.0.1:8000/api/users/`;
        url += chat.User_2_id === userId ? chat.User_1_id : chat.User_2_id;
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        return data.user.name; 
      }));
      setUserDetails(details);
    } catch (error) {
      setError("Failed to fetch user details.");
      console.error("Error fetching user details:", error);
    }
  };
 
  useEffect( () => {
    getChats();
    fetchUserDetails(chats);
  }, [chats]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="chat-container">
      <h1 className="chat-title">Chats</h1>
      {error && <p>{error}</p>}
      <ul className="chat-list">
        {chats.map((chat, index) => (
          <li key={chat.id} className="chat-item">
            <div className="chat-card">
              <div className="chat-info">
              <p className="chat-name">{userDetails[index]}</p>
              </div>
              <div className="chat-actions">
                <p className="chat-date">{formatDate(chat.created_at)}</p>
                <Button 
                    text = "view chat"
                    // onClick = {() =>  navigate (`/message/${chat.id}`)}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Chat;

