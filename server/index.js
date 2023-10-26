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
app.use(cors());

connectDb();

app.get("/", (req, res) => {
  res.send("API is running..");
});

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running at port ${PORT}`));
