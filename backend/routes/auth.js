const router = require('express').Router();
const passport = require('passport');

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'https://mindfulpath-platform.vercel.app'
  }),
  (req, res) => {
    res.redirect('https://mindfulpath-platform.vercel.app?login=success');
  }
);

router.get('/user', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    profilePic: req.user.profilePic,
    bio: req.user.bio
  });
});

router.get('/logout', (req, res) => {
  req.logout(() => {
    req.session.destroy(() => {
      res.clearCookie('connect.sid', {
        path: '/',
        sameSite: 'none',
        secure: true
      });
      res.json({ message: 'Logged out' });
    });
  });
});

module.exports = router;
