import React, { useEffect, useState } from "react";
import "./styles.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NightlightIcon from "@mui/icons-material/Nightlight";
import SearchIcon from "@mui/icons-material/Search";
import LightModeIcon from "@mui/icons-material/LightMode";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Redux/themeSlice";
import axios from "axios";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.themeKey);

  const [conversation, setConversation] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (!userData) {
    navigate("/");
  }

  const user = userData.data;
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    axios.get("http://localhost:8080/chat", config).then((response) => {
      setConversation(response.data);
    });
  }, []);

  return (
    <div className="sidebar-container">
      <div className={"sb-header" + (theme ? "" : " dark")}>
        <div>
          <IconButton>
            <AccountCircleIcon className={"icon" + (theme ? "" : " dark")} />
          </IconButton>
        </div>

        <div>
          <IconButton
            onClick={() => {
              navigate("user-group");
            }}
          >
            <PersonAddIcon className={"icon" + (theme ? "" : " dark")} />
          </IconButton>
          <IconButton>
            <GroupAddIcon className={"icon" + (theme ? "" : " dark")} />
          </IconButton>
          <IconButton
            onClick={() => {
              navigate("create-groups");
            }}
          >
            <AddCircleIcon className={"icon" + (theme ? "" : " dark")} />
          </IconButton>
          <IconButton
            onClick={() => {
              dispatch(toggleTheme());
            }}
          >
            {theme && (
              <NightlightIcon className={"icon" + (theme ? "" : " dark")} />
            )}
            {!theme && (
              <LightModeIcon className={"icon" + (theme ? "" : " dark")} />
            )}
          </IconButton>
          <IconButton
            onClick={() => {
              localStorage.removeItem("userData");
              navigate("/");
            }}
          >
            <ExitToAppIcon className={"icon" + (theme ? "" : " dark")} />
          </IconButton>
        </div>
      </div>
      <div className={"sb-search" + (theme ? "" : " dark")}>
        <IconButton>
          <SearchIcon className={"icon" + (theme ? "" : " dark")} />
        </IconButton>
        <input
          type="text"
          placeholder="Search..."
          className={"search-box" + (theme ? "" : " dark")}
        />
      </div>
      <div className={"sb-conversations" + (theme ? "" : " dark")}>
        {conversation.map((conversation, index) => {
          // console.log("current convo : ", conversation);
          if (conversation.users.length === 1) {
            return <div key={index}></div>;
          }
          if (conversation.latestMessage === undefined) {
            // console.log("No Latest Message with ", conversation.users[1]);
            return (
              <div key={index}>
                <div
                  key={index}
                  className="conversation-container"
                  onClick={() => {
                    navigate(
                      "chat/" +
                        conversation._id +
                        "&" +
                        conversation.users[1].name
                    );
                  }}
                  // dispatch change to refresh so as to update chatArea
                >
                  <p className={"con-icon" + (theme ? "" : " dark")}>
                    {conversation.users[1].name[0]}
                  </p>
                  <p className={"con-title" + (theme ? "" : " dark")}>
                    {conversation.users[1].name}
                  </p>

                  <p className="con-lastMessage">
                    No previous Messages, click here to start a new chat
                  </p>
                  {/* <p className={"con-timeStamp" + (theme ? "" : " dark")}>
                {conversation.timeStamp}
              </p> */}
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={index}
                className="conversation-container"
                onClick={() => {
                  navigate(
                    "chat/" +
                      conversation._id +
                      "&" +
                      conversation.users[1].name
                  );
                }}
              >
                <p className={"con-icon" + (theme ? "" : " dark")}>
                  {conversation.users[1].name[0]}
                </p>
                <p className={"con-title" + (theme ? "" : " dark")}>
                  {conversation.users[1].name}
                </p>

                <p className="con-lastMessage">
                  {conversation.latestMessage.content}
                </p>
                {/* <p className={"con-timeStamp" + (lightTheme ? "" : " dark")}>
                {conversation.timeStamp}
              </p> */}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default SideBar;
