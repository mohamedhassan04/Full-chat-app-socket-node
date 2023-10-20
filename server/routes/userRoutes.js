const express = require("express");
const { registerController } = require("../controllers/userController");

const Router = express.Router();

// Router.post("/login", loginController);
Router.post("/register", registerController);

module.exports = Router;
