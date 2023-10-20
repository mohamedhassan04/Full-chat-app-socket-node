import React, { useState } from "react";
import "./styles.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MessageOther from "./MessageOther";
import MessageSelf from "./MessageSelf";

const ChatArea = () => {
  const [conversation, setConversation] = useState({
    name: "Aymen Chatti",
    lastMessage: "Last Message #1",
    timeStamp: "02:30 pm",
  });
  return (
    <div className="chatarea-container">
      <div className="chatarea-header">
        <p className="con-icon">{conversation.name[0]}</p>
        <div className="header-text">
          <p className="con-title">{conversation.name}</p>
          <p className="con-timeStamp">{conversation.timeStamp}</p>
        </div>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </div>
      <div className="messages-container">
        <MessageOther />
        <MessageSelf />
      </div>
      <div className="text-input-area">
        <input
          type="text"
          placeholder="Type a Message..."
          className="search-box"
        />
        <IconButton>
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ChatArea;
