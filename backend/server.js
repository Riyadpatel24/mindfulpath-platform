const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

// Load passport config
require('./passport');

// Load database connection
require('./config/db');

const app = express();

// CORS Configuration
app.use(cors({
  origin: [
    'https://mindfulpath-platform.vercel.app',
    'http://localhost:3001'
  ],
  credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Configuration (without MongoStore for now)
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/userdata'));

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'MindfulPath API Running',
    environment: process.env.NODE_ENV 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ Environment: ${process.env.NODE_ENV}`);
});

// Update user profile endpoint
app.put('/user/profile', async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const { name, bio, profileImage } = req.body;

    // Update user in database
    const updatedUser = await User.findByIdAndUpdate(
      req.session.userId,
      {
        name,
        bio,
        profileImage
      },
      { new: true, runValidators: true }
    ).select('-password'); // Don't send password back

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
});