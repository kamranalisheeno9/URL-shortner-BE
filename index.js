// Initialiation

const express = require("express");
const { cronForCheckingExpiredUrl } = require("./services/cron");
const { connectDB } = require("./connection");
const urlRouter = require("./routes/url");

const app = express();
const port = 3002;

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connecting DB

connectDB("mongodb://127.0.0.1:27017/url-shortner")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("Error is connectiong DB", err);
  });

// Cron Job

cronForCheckingExpiredUrl();

// Routes

app.use("/api/urls", urlRouter);

// PORT Listening at
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
