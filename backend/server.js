const express = require("express");
const cors = require("cors");
const passport = require("passport");
require("dotenv").config();
const session = require("express-session");
require("./config/db");
require("./passport");

const authRoutes = require("./routes/auth");
const userdataRoutes = require("./routes/userdata");

const app = express();


app.use(cors({
  origin: "https://mindfulpath-platform.vercel.app",
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultsecret',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/api", userdataRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("MindfulPath Backend is running 🚀");
});

app.listen(PORT, () => {
  console.log("Backend is running on port", PORT);
});
