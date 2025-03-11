// Initialization

const mongoose = require("mongoose");

// Defining Schemas

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    shortenedUrl: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Number,
      required: true,
      // expires: 0 // Optional: TTL index to auto-delete document when expiresAt is reached
    },
    isExpired: {
      type: Boolean,
    },
    clicks: {
      type: Number,
      // required: true,
    },
  },
  { timestamps: true }
);

// Creating model from schema

const URLShortened = mongoose.model("URLShortened", urlSchema);

module.exports = URLShortened;
