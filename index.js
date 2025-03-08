// Initialiation

const express = require("express");
const path = require("path");
const { cronForCheckingExpiredUrl } = require("./services/cron");
const URL = require("./models/url");
const { connectDB } = require("./connection");
const urlRouter = require("./routes/url");

const app = express();
const port = 3002;

// Setting up EJS

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// EJS Page Routes

app.get("/", async (req, res) => {
  const allUrls = await URL.find({});
  res.render("main", {
    allUrls,
  });
});
// app.get("/url/:shortId", async (req, res) => {
//   const shortId = req.params.shortId;
//   const urlSearched = await URL.findById(shortId);
//   if(!urlSearched){
//    return res.render("404");
//   }
//   else{
//     return res.render("main")
//   }
// });

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
