import React, { useEffect, useState } from "react";
import "./styles.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MessageOther from "./MessageOther";
import MessageSelf from "./MessageSelf";
import { useParams } from "react-router-dom";
import axios from "axios";

const ChatArea = () => {
  const [messageContent, setMessageContent] = useState("");
  const dyParams = useParams();
  const [chat_id, chat_user] = dyParams._id.split("&"); //ken ma na3malech split ye5ou the two first number of id
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [allMessages, setAllMessages] = useState([]);
  const [allMessagesCopy, setAllMessagesCopy] = useState([]);

  console.log(allMessages);

  const [loaded, setLoaded] = useState(false);

  const sendMessage = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };
    axios
      .post(
        "http://localhost:8080/message/",
        {
          content: messageContent,
          chatId: chat_id,
        },
        config
      )
      .then(({ data }) => {
        console.log(data);
      });
  };

  //fetch Chats
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };
    axios
      .get("http://localhost:8080/message/" + chat_id, config)
      .then(({ data }) => {
        console.log(data);
        setAllMessages(data);
        setLoaded(true);
        // socket.emit('join chat',chat_id)
      });
    setAllMessagesCopy(allMessages);
  }, [chat_id, userData.data.token]);

  return (
    <div className="chatarea-container">
      <div className="chatarea-header">
        <p className="con-icon">{chat_user[0]}</p>
        <div className="header-text">
          <p className="con-title">{chat_user}</p>
          {/* <p className="con-timeStamp">t</p> */}
        </div>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </div>
      <div className="messages-container">
        {allMessages
          .slice(0)
          .reverse()
          .map((message, index) => {
            console.log(message);
            const sender = message.sender;
            const self_id = userData.data._id;
            if (sender._id === self_id) {
              return <MessageSelf props={message} key={index} />;
            } else {
              return <MessageOther props1={message} key={index} />;
            }
          })}
      </div>
      <div className="text-input-area">
        <input
          type="text"
          placeholder="Type a Message..."
          className="search-box"
          value={messageContent}
          onChange={(e) => {
            setMessageContent(e.target.value);
          }}
          onKeyDown={(event) => {
            if (event.code == "Enter") {
              sendMessage();
              setMessageContent("");
            }
          }}
        />
        <IconButton
          onClick={() => {
            sendMessage();
          }}
        >
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ChatArea;
