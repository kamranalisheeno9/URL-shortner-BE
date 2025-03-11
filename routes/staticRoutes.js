// Initialization
const express = require("express");
const URL = require("../models/url");
const router = express.Router();

// Home route
router.get("/", (req, res) => {
  return res.render("main");
});

// All URLs listing route
router.get("/listed-urls", async (req, res) => {
  try {
    const allUrls = await URL.find({});
    return res.render("allUrls", {
      allUrls,
    });
  } catch (error) {
    console.error("Error fetching all URLs:", error);
    return res.status(500).render("error");
  }
});

router.get("/signup", (req, res) => {
  return res.render("signup", {
    message: { type: "success", text: "User registered!" },
  });
});
router.get("/login", (req, res) => {
  return res.render("login");
});

// URL redirection route
router.get("/url/:shortId", async (req, res) => {
  try {
    const { shortId } = req.params;
    const urlSearched = await URL.findOne({ shortenedUrl: shortId });

    if (!urlSearched) {
      return res.status(404).render("404");
    }

    if (urlSearched.isExpired) {
      return res.status(410).render("404");
    }

    urlSearched.clicks += 1;
    await urlSearched.save();
    return res.redirect(urlSearched.originalUrl);
  } catch (error) {
    console.error("Error fetching URL:", error);
    return res.status(500).render("error");
  }
});

module.exports = router;
