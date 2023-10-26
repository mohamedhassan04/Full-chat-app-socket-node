const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupeChat,
  fetchGroups,
  groupExit,
} = require("../controllers/chatController");
const { protect } = require("../middleware/authMiddleware");

const Router = express.Router();

Router.route("/").post(protect, accessChat);
Router.route("/").get(protect, fetchChats);
Router.route("/createGroup").post(protect, createGroupeChat);
Router.route("/fetchGroups").get(protect, fetchGroups);
Router.route("/groupExit").put(protect, groupExit);

module.exports = Router;
