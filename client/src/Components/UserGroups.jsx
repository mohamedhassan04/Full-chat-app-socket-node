import React from "react";
import "./styles.css";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

const UserGroups = () => {
  const theme = useSelector((state) => state.themeKey);
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
          <input type="text" placeholder="Search..." className="search-box" />
        </div>
        <div className="ug-list">
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="list-tem"
          >
            <p className="con-icon">T</p>
            <p className="con-title">Test User</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="list-tem"
          >
            <p className="con-icon">T</p>
            <p className="con-title">Test User</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="list-tem"
          >
            <p className="con-icon">T</p>
            <p className="con-title">Test User</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="list-tem"
          >
            <p className="con-icon">T</p>
            <p className="con-title">Test User</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="list-tem"
          >
            <p className="con-icon">T</p>
            <p className="con-title">Test User</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="list-tem"
          >
            <p className="con-icon">T</p>
            <p className="con-title">Test User</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="list-tem"
          >
            <p className="con-icon">T</p>
            <p className="con-title">Test User</p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UserGroups;
