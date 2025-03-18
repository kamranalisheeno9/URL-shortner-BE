// Initialization

const URLShortened = require("../models/url");
const { nanoid } = require("nanoid");
const { errorHandler } = require("../helpers/errorHandler");

// POST data for URL

const handleURLCreation = async (req, res) => {
  try {
    const { originalUrl, expires } = req.body;
    if (!originalUrl) {
      return res.status(400).json({
        message: "Please fill the fields properly.",
      });
    }
    const shortId = nanoid();
    const user = req.user;
    const urlShortened = await URLShortened.create({
      originalUrl: originalUrl,
      shortenedUrl: shortId,
      expiresAt: Number(expires) * 60 * 1000,
      isExpired: false,
      createdBy: user.id,
      clicks: 0,
    });
    return res.status(201).redirect("/url/list");
  } catch (error) {
    errorHandler(res, error);
  }
};

// Getting all URLs

const handleGetAllUrls = async (req, res) => {
  const allUrlShortened = await URLShortened.find({});
  try {
    return res.status(201).json({
      allUrlShortened,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

// Getting URL by Id

const handleGetUrlByShortId = async (req, res) => {
  const shortId = req.params.shortId;
  try {
    const ShortenedUrl = await URLShortened.findById(shortId);
    return res.status(201).json({
      ShortenedUrl,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

// Updating URL by Id

const handleUpdateUrlByShortId = async (req, res) => {
  const shortId = req.params.shortId;
  const updatedUrl = await URLShortened.findByIdAndUpdate(shortId, {
    originalUrl: req.body.originalUrl,
    expiresAt: req.body.expires,
  });
  try {
    return res.status(201).json({
      message: `Updated the URL ${updatedUrl.originalUrl}`,
    });
  } catch (error) {}
};

// Deleting URL by Id

const handleDeleteUrlByShortId = async (req, res) => {
  const shortId = req.params.shortId;
  const deletedUrl = await URLShortened.findByIdAndDelete(shortId);
  try {
    return res.status(201).json({
      message: `Deleted the url  ${deletedUrl.originalUrl}`,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  handleURLCreation,
  handleGetAllUrls,
  handleDeleteUrlByShortId,
  handleGetUrlByShortId,
  handleUpdateUrlByShortId,
};
