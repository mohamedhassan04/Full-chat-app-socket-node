console.clear();
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./db_config/dbConfig");

const app = express();
dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

connectDb();

app.get("/", (req, res) => {
  res.send("API is running..");
});

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server is running at port ${PORT}`)
);

// Import the 'socket.io' library and create a new instance of a Socket.IO server
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
  pingTimeout: 60000,
});

// Handle a new client connection
io.on("connection", (socket) => {
  // When a user connects to the server

  // Listen for a "setup" event from the client
  socket.on("setup", (user) => {
    // Join a room with the user's data _id as the room name
    socket.join(user.data._id);
    // Send a "connected" event back to the client
    socket.emit("connected");
  });

  // Listen for a "join chat" event from the client
  socket.on("join chat", (room) => {
    // Join a specific chat room
    socket.join(room);
    // console.log("user joined room:", room);
  });

  // Listen for a "new message" event from the client
  socket.on("new message", (newMessageStatus) => {
    // Retrieve chat information from the newMessageStatus
    var chat = newMessageStatus.chat;

    // Check if the chat's 'users' property is defined
    if (!chat.users) {
      // Log an error if 'users' is not defined
      return console.log("chat users not defined");
    }

    // Iterate through each user in the chat's 'users' array
    chat.users.forEach((user) => {
      // Skip the sender of the message
      if (user._id == newMessageStatus.sender._id) return;

      // Emit a "message received" event to the user's room, sending the new message status
      socket.in(user._id).emit("message received", newMessageStatus);
    });
  });
});
