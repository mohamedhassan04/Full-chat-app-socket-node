const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const {
  sendMessage,
  allMessages,
} = require("../controllers/messageController");

const Router = express.Router();

Router.route("/").post(protect, sendMessage);
Router.route("/:chatId").get(protect, allMessages);

module.exports = Router;
