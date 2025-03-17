// Initialization
const express = require("express");
const URL = require("../models/url");
const router = express.Router();

router.get("/", (req, res) => {
  return res.render("main",{
    currentUser: req.user.name,

  });
});

// All URLs listing route
router.get("/list", async (req, res) => {
  try {
    const allUrls = await URL.find({
      createdBy: req.user.id,
    });
    return res.render("allUrls", {
      allUrls,
      currentUser: req.user.name,
    });
  } catch (error) {
    console.error("Error fetching all URLs:", error);
    return res.status(500).render("error");
  }
});

// URL redirection route
router.get("/:shortId", async (req, res) => {
  try {
    const { shortId } = req.params;
    const urlSearched = await URL.findOne({ shortenedUrl: shortId });

    if (!urlSearched) {
      return res.status(404).render("404",{
        customMessage:''
      });
    }

    if (urlSearched.isExpired) {
      return res.status(410).render("404",{
        customMessage:''
      });
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
