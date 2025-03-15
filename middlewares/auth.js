const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.JWT_SECRET;

const restrictTheUserToUrl = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).redirect("/");
    }

    const user = jwt.verify(token, secretKey);

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
    const token = req.cookies?.token;

    if (token) {
      const user = jwt.verify(token, secretKey);
      if (user) {
        return res.redirect("/url");
      }
    }

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
