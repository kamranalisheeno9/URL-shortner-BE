const User = require("../models/user");
const { errorHandler } = require("../helpers/errorHandler");
const { v4: uuidv4 } = require("uuid");
const { setJwtForLogin } = require("../services/auth");
require("dotenv").config();
const secretKey = process.env.JWT_SECRET;
const {
  getSessionIdMapToUser,
  setSessionIdMapToUser,
} = require("../services/auth");
const handleUserSignup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !email || !password) {
      return res.status(400).json({
        message: "Email or password or first name is missing.",
      });
    }
    const result = await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    console.log("Result", result);
    return res.status(201).redirect('/url');
  } catch (error) {
    errorHandler(res, error);
  }
};

const handleUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "Email is not valid.",
      });
    }
    if (!password) {
      return res.status(400).json({
        message: "Password is incorrect.",
      });
    }
    const currentUser = await User.findOne({
      email,
      password,
    });
    if (!currentUser) {
      return res.status(200).json({
        message: "There is no such user.",
      });
    }
    // const sessionId = uuidv4();

    const token = setJwtForLogin(currentUser, secretKey);
    res.cookie("token", token);
    // setSessionIdMapToUser(sessionId, currentUser);
    return res.status(200).redirect("/url");
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  handleUserLogin,
  handleUserSignup,
};
