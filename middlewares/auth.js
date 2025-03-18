const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.JWT_ACCESS_SECRET;

const restrictTheUserToUrl = (req, res, next) => {
  try {
    const accessToken = req.cookies?.token;

    if (!accessToken) {
      return res.status(401).redirect("/");
    }

    const user = jwt.verify(accessToken, secretKey);

    if (!user) {
      return res.status(401).redirect("/");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);

    res.status(401).redirect("/");
  }
};

const restrictTheUserToLogin = (req, res, next) => {
  try {
    const accessToken = req.cookies?.token;

    if (accessToken) {
      const user = jwt.verify(accessToken, secretKey);
      if (user) {
        return res.redirect("/url");
      }
    }
    console.log("token", accessToken);

    next();
  } catch (error) {
    console.error("Login restriction error:", error.message);
    next();
  }
};

module.exports = {
  restrictTheUserToLogin,
  restrictTheUserToUrl,
};
