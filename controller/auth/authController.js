const User = require("../../models/user");

const ctrlWrapper = require("../../helper/ctrlWrapper");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const fs = require("fs/promises");
const path = require("path");
const { token } = require("morgan");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        status: "error",
        message: "Email is already in use",
      });
    }

    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const payload = { id: newUser._id };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });

    res.status(201).json({
      status: "success",
      user: {
        name: newUser.name,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.error("Помилка в функції register:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Incorrect login or password",
        data: "Bad request",
      });
    }
    const payload = { id: user._id, name: user.name };
    const token = jwt.sign(payload, process.env.SECRET);
    await User.findByIdAndUpdate(user._id, { token }, { new: true });
    res.json({
      status: "success",
      code: 200,
      user: {
        email,
        token,
        name: user.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logOut = async (req, res, next) => {
 
  console.log(req.user._id);
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { token: null },
      { new: true }
    );
    return res.json({
      status: "success",
      code: 204,
      data: {
        message: "No Content",
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
const currentUser = async (req, res, next) => {
  try {
    const { email, name } = req.user;
    console.log({email, name})
    res.json({
      status: "success",
      code: 200,
      user: {
        email,
        name,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register: ctrlWrapper(register),
  logIn: ctrlWrapper(logIn),
  logOut: ctrlWrapper(logOut),
  currentUser: ctrlWrapper(currentUser)
};
