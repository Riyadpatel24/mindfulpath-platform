const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require('connect-mongo');

// Only load .env in development
if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config();
}

require("./config/db");
require("./passport");

const authRoutes = require("./routes/auth");
const userdataRoutes = require("./routes/userdata");

const app = express();

// CORS - Allow Vercel preview URLs, production, and localhost
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    // Allow any vercel.app domain, Render domain, or localhost
    if (
      origin.includes('vercel.app') || 
      origin === 'https://mindfulpath-platform.onrender.com' ||
      origin === 'http://localhost:3000'
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Session configuration with MongoDB store for production
app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultsecret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongoUrl: process.env.MONGO_URI,
    touchAfter: 24 * 3600, // lazy session update (in seconds)
    crypto: {
      secret: process.env.SESSION_SECRET || 'defaultsecret'
    }
  }),
  cookie: { 
    secure: process.env.NODE_ENV === 'production', // true in production (HTTPS)
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/api", userdataRoutes);

// Use Render's PORT or default to 5000 for local
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("MindfulPath Backend is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});