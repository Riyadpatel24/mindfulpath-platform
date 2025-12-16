const router = require('express').Router();
const passport = require('passport');

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect("https://mindfulpath-platform.vercel.app");
    }
);

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('http://localhost:3000');
});

module.exports = router;