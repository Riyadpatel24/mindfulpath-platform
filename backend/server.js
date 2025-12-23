const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

require('./passport');
require('./config/db');

const app = express();

app.use(cors({
  origin: [
    'https://mindfulpath-platform.vercel.app',
    'http://localhost:3000',
    'http://localhost:3001'
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('trust proxy', 1);

app.use(session({
  secret: process.env.SESSION_SECRET || 'hackathon-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000,
  secure: true,          // MUST be true on Render
  sameSite: 'none'       // MUST be 'none' for Vercel ↔ Render
}

}));

app.use(passport.initialize());
app.use(passport.session());

// ROUTES
app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/userdata'));

app.get('/', (req, res) => {
  res.json({
    message: 'MindfulPath API Running',
    authenticated: req.isAuthenticated()
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
