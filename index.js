// Initialiation

const express = require("express");
const cookieParser = require('cookie-parser');
const path = require("path");
const { cronForCheckingExpiredUrl } = require("./services/cron");
const URL = require("./models/url");
const { connectDB } = require("./connection");
const urlRouter = require("./routes/url");
const staticRouter = require("./routes/staticRoutes");
const userRouter = require("./routes/user");
const app = express();
const port = 3002;

// Setting up EJS

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", async (req, res) => {
  const allUrls = await URL.find({});
  res.render("main", {
    allUrls,
  });
});

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

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
app.use("/", staticRouter);
app.use("/api/", userRouter);

// PORT Listening at
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
