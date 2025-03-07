// Initialization

const express = require("express");
const router = express.Router();
const {
  handleURLCreation,
  handleGetAllUrls,
  handleDeleteUrlByShortId,
  handleGetUrlByShortId,
  handleUpdateUrlByShortId,
} = require("../controllers/url");

// 'api/urls/' routes

router.route("/").get(handleGetAllUrls).post(handleURLCreation);

// 'api/urls/shortId' routes

router
  .route("/:shortId")
  .get(handleGetUrlByShortId)
  .patch(handleUpdateUrlByShortId)
  .delete(handleDeleteUrlByShortId);

//   all exports

module.exports = router;
