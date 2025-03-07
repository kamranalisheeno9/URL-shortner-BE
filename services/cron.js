// Initialization

const cron = require("node-cron");
const URL = require("../models/url");

// Executing cron for every minute to check which URL has reached the time of expiry and setting status expired true.

const cronForCheckingExpiredUrl = () => {
  cron.schedule("* * * * *", async () => {
    const allUrls = await URL.find({});
    console.log("Running a task every minute");
    console.log("allUrls", allUrls);
  });
};

module.exports = {
  cronForCheckingExpiredUrl,
};
