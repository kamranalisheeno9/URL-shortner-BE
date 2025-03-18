const User = require("../models/user");
const { errorHandler } = require("../helpers/errorHandler");
const {
  setJWTAccessTokenForLogin,
  setJWTRefreshTokenForLogin,
} = require("../services/auth");
require("dotenv").config();
const accessSecretKey = process.env.JWT_ACCESS_SECRET;
const refreshSecretKey = process.env.JWT_REFRESH_SECRET;
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
    // console.log("Result", result);
    return res.status(201).redirect("/url");
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
      return res.status(200).render("404", {
        customMessage: "User not found",
      });
    }

    const accessToken = setJWTAccessTokenForLogin(currentUser, accessSecretKey);
    const refreshToken = setJWTRefreshTokenForLogin(
      currentUser,
      refreshSecretKey
    );
    await User.findByIdAndUpdate(currentUser._id, { refreshToken });
    res.cookie("token", accessToken);
    res.cookie("refreshToken", refreshToken);


    return res.status(200).redirect("/url");
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  handleUserLogin,
  handleUserSignup,
};
