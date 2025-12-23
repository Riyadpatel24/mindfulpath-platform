const router = require('express').Router();
const passport = require('passport');

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    const redirectUrl =
      req.headers.origin ||
      req.headers.referer ||
      process.env.FRONTEND_URL;

    res.redirect(`${redirectUrl}?login=success`);
  }
);


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
      res.clearCookie('connect.sid');
      res.json({ message: 'Logged out successfully' });
    });
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
