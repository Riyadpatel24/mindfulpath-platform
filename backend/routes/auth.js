const router = require('express').Router();
const passport = require('passport');

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Use CLIENT_URL environment variable for production
        const frontendUrl = process.env.CLIENT_URL || 'http://localhost:3000';
        
        res.redirect(frontendUrl);
    }
);

// Logout route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ message: 'Logout failed' });
    }
    req.session.destroy((err) => {
      if (err) {
        console.error('Session destroy error:', err);
      }
      res.clearCookie('connect.sid'); // Clear the session cookie
      res.json({ message: 'Logged out successfully' });
    });
  });
});

router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      id: req.user._id,
      googleId: req.user.googleId,
      email: req.user.email,
      name: req.user.name,
      profilePic: req.user.profilePic
    });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

module.exports = router;