// Initialization

const URLShortened = require("../models/url");
const { nanoid } = require("nanoid");

// POST data for URL

const handleURLCreation = async (req, res) => {
  try {
    const { originalUrl, expires } = req.body;
    const shortId = nanoid();
    const urlShortened = await URLShortened.create({
      originalUrl: originalUrl,
      shortenedUrl: shortId,
      expiresAt: Number(expires) * 60 * 1000,
      isExpired: false,
    });
    return res.status(201).json({
      message: "Post url",
      result: urlShortened,
      status: "Success",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      status: "Failed",
      error: error.message,
    });
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
    return res.status(500).json({
      message: "Internal server error",
      status: "Failed",
      error: error.message,
    });
  }
};

// Getting URL by Id

const handleGetUrlByShortId = async (req, res) => {
  const shortId = req.params.shortId;
  const ShortenedUrl = await URLShortened.findById(shortId);
  try {
    return res.status(201).json({
      ShortenedUrl,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      status: "Failed",
      error: error.message,
    });
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
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      status: "Failed",
      error: error.message,
    });
  }
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
    return res.status(500).json({
      message: "Internal server error",
      status: "Failed",
      error: error.message,
    });
  }
};

module.exports = {
  handleURLCreation,
  handleGetAllUrls,
  handleDeleteUrlByShortId,
  handleGetUrlByShortId,
  handleUpdateUrlByShortId,
};
