const express = require("express");
const cors = require("cors");
const passport = require("passport");
require("dotenv").config();
const session = require("express-session");
require("./config/db");
require("./passport");

const authRoutes = require("./routes/auth");

const app = express();

app.use(cors({
  origin: "https://mindfulpath-platform.vercel.app",
  credentials: true
}));

app.use(session({
  secret: process.env.COOKIE_KEY,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("MindfulPath Backend is running 🚀");
});

app.listen(PORT, () => {
  console.log("Backend is running on port", PORT);
});
