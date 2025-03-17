// Initialiation

require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cookieParser = require("cookie-parser");
const path = require("path");
const { cronForCheckingExpiredUrl } = require("./services/cron");
const URL = require("./models/url");
const { connectDB } = require("./connection");
const urlRouter = require("./routes/url");
const loginRouter = require("./routes/loginRoutes");
const userRouter = require("./routes/user");
const generalURLRouter = require("./routes/generalUrlRoutes");
const {
  restrictTheUserToUrl,
  restrictTheUserToLogin,
} = require("./middlewares/auth");
const app = express();
const port = 3002;

// Setting up EJS

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
app.use(cookieParser());

// Create a Nodemailer transporter using Brevo SMTP
const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: process.env.BREVO_SMTP_PORT,
  secure: false, // Use TLS (false for port 587, true for port 465)
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_KEY,
  },
});

// Route to send an email
app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;

  // Email options
  const mailOptions = {
    from: process.env.BREVO_SMTP_USER, // Sender address (must be verified in Brevo)
    to: to, // Recipient address
    subject: subject || "Test Email from Brevo SMTP",
    text:
      text ||
      "Hello! This is a test email sent using Brevo SMTP and Express.js.",
    html: "<h1>Hello!</h1><p>This is a test email with HTML content.</p>",
  };

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

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

app.use("/api/urls", restrictTheUserToUrl, urlRouter);
app.use("/url", restrictTheUserToUrl, generalURLRouter);
app.use("/", restrictTheUserToLogin, loginRouter);
app.use("/api/", userRouter);

// PORT Listening at
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
