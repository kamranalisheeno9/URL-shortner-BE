// Initialization
const express = require("express");
const router = express.Router();

// Home route

router.get("/signup", (req, res) => {
  return res.render("signup", {
    message: { type: "success", text: "User registered!" },
  });
});
router.get("/", (req, res) => {
  return res.render("login");
});


module.exports = router;
