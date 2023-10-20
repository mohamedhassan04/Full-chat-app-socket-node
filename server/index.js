console.clear();
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const dotenv = require("dotenv");
const connectDb = require("./db_config/dbConfig");

const app = express();
dotenv.config();
app.use(express.json());

connectDb();

app.get("/", (req, res) => {
  res.send("API is running..");
});

app.use("/user", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running at port ${PORT}`));
