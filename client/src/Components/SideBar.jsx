import React, { useState } from "react";
import "./styles.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NightlightIcon from "@mui/icons-material/Nightlight";
import SearchIcon from "@mui/icons-material/Search";
import LightModeIcon from "@mui/icons-material/LightMode";
import { IconButton } from "@mui/material";
import ConversationItem from "./ConversationItem";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Redux/themeSlice";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.themeKey);

  const [conversation, setConversation] = useState([
    {
      name: "Aymen Chatti",
      lastMessage: "Last Message #1",
      timeStamp: "02:30 pm",
    },
    {
      name: "AlaaEddine Bahri",
      lastMessage: "Last Message #2",
      timeStamp: "02:45 pm",
    },
    {
      name: "Feriel Jebri",
      lastMessage: "Last Message #3",
      timeStamp: "08:30 pm",
    },
  ]);

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
        {conversation &&
          conversation.map((el) => {
            return <ConversationItem props={el} />;
          })}
      </div>
    </div>
  );
};

export default SideBar;
