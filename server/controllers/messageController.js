const expressAsyncHandler = require("express-async-handler");
const messageModel = require("../models/messageModel");
const userModel = require("../models/userModel");
const chatModel = require("../models/messageModel");

const allMessages = expressAsyncHandler(async (req, res) => {
  try {
    const messages = await messageModel
      .find({ chatId: req.params.chatId })
      .populate("sender", "name email")
      .populate("receiver")
      .populate("chatId");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const sendMessage = expressAsyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chatId: chatId,
  };

  try {
    var message = await messageModel.create(newMessage);

    message = await message.populate("sender", "name pic");
    message = await message.populate("chatId");
    message = await message.populate("receiver");
    message = await userModel.populate(message, {
      path: "chat.users",
      select: "name email",
    });

    await chatModel.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });
    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { allMessages, sendMessage };
