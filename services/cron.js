// Initialization

const cron = require("node-cron");
const URLShortened = require("../models/url");
// const expiredURLs = [];

// Calculating the expired URL status from time UpdatedAt time and current time using expired time duration.

const checkExpiry = (updatedAt, expiry) => {
  const updatedTime = new Date(updatedAt);
  const currentTime = new Date();
  const timeDifference = currentTime - updatedTime;
  return timeDifference >= expiry;
};

// Finding expired URLs and pushing into array and Updating status of expired URL to true.

const findingExpiredURLS = async () => {
  try {
    const allURLS = await URLShortened.find({});
    allURLS.forEach(async (url) => {
      const isExpiredTrue = checkExpiry(url.updatedAt, url.expiresAt);
      if (isExpiredTrue) {
        try {
          await URLShortened.findByIdAndUpdate(url._id, { isExpired: true });
        } catch (error) {
          console.log("Error from updating isExpired");
        }
        // expiredURLs.push(url);
      }
      // console.log("Expired URLs", expiredURLs);
    });
  } catch (error) {
    console.log(err);
  }
};

// Cron job runs every minute to check the expired URL

const cronForCheckingExpiredUrl = () => {
  cron.schedule("* * * * *", async () => {
    findingExpiredURLS();
  });
};

module.exports = {
  cronForCheckingExpiredUrl,
};
