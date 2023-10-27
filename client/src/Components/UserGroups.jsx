import React, { useEffect, useState } from "react";
import "./styles.css";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { refreshSidebarFun } from "../Redux/refreshSideBar";
import axios from "axios";

const UserGroups = () => {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const theme = useSelector((state) => state.themeKey);
  const [users, setUsers] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));

  const navigate = useNavigate();

  if (!userData) {
    console.log("User Not Authenticated");
    navigate(-1);
  }

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${userData?.data?.token}`,
      },
    };

    const fetchUsers = () => {
      axios
        .get(
          `http://localhost:8080/user/fetchUsers?search=${searchTerm}`,
          config
        )
        .then((data) => {
          setUsers(data.data);
        });
    };

    fetchUsers(); // Initial fetch without search term
  }, [refresh, searchTerm]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{
          ease: "anticipate",
          duration: "0.3",
        }}
        className="list-container"
      >
        <div className={"ug-header" + (theme ? "" : " dark")}>
          <img
            src="https://img.freepik.com/premium-vector/chat-app-logo-design-vector_18099-2967.jpg"
            alt="logo"
            style={{ height: "2rem", width: "2rem", marginLeft: "10px" }}
          />
          <p className={"ug-title" + (theme ? "" : " dark")}>Online Users</p>
        </div>
        <div className="sb-search">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <input
            type="text"
            placeholder="Search..."
            className="search-box"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="ug-list">
          {users.map((user, index) => {
            return (
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="list-tem"
                key={index}
                onClick={() => {
                  const config = {
                    headers: {
                      Authorization: `Bearer ${userData?.data?.token}`,
                    },
                  };
                  axios.post(
                    "http://localhost:8080/chat",
                    {
                      userId: user._id,
                    },
                    config
                  );
                  dispatch(refreshSidebarFun());
                }}
              >
                <p className="con-icon">{user.name[0]}</p>
                <p className="con-title">{user.name}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UserGroups;
