const express = require("express");
const UserModel = require("../models/userModel");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../config_token/generateToken");

const loginController = expressAsyncHandler(async (req, res) => {
  const { name, password } = req.body;
  const user = await UserModel.findOne({ name });

  if (user && (await user.matchPassword(password))) {
    const response = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    };
    res.json(response);
  } else {
    res.status(401);
    throw new Error("Invalid UserName or Password");
  }
});

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

const fetchAllUsersController = expressAsyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          //In this code, $regex is employed to search for users whose name or email fields match a given search term in a case-insensitive manner.
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await UserModel.find(keyword).find({
    //$ne is applied to ensure that the currently authenticated is not included in the search results
    _id: { $ne: req.user._id },
  });
  res.send(users);
});

module.exports = {
  registerController,
  loginController,
  fetchAllUsersController,
};
