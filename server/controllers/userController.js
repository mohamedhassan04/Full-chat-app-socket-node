const express = require("express");
const UserModel = require("../models/userModel");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../config_token/generateToken");

// loginController = () => {};

const registerController = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please file all the inputs");
  }

  const userExist = await UserModel.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  const userNameExist = await UserModel.findOne({ name });
  if (userNameExist) {
    res.status(400);
    throw new Error("This user name already exist");
  }

  const user = await UserModel.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Registration failed");
  }
});

module.exports = { registerController };
