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

// Page routes

app.get('/',(req,res)=>{
  return res.render('main')
})

app.get("/url/:shortId", async (req, res) => {
  try {
    const { shortId } = req.params;

    const urlSearched = await URL.findOne({ _id: shortId });

    if (!urlSearched) {
      return res.status(404).render("404");
    }

    return res.redirect(urlSearched.originalUrl);
  } catch (error) {
    console.error("Error fetching URL:", error);
    return res.status(500).render("404");
  }
});

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
