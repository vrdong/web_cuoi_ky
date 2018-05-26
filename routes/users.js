var express = require('express');
var router = express.Router();
var passport = require('passport');

var csrf = require('csurf');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/signup', function(req, res, next) {
  var messages = req.flash('error')
  res.render('users/signup', {csrfToken: req.csrfToken(), messages: messages , hasErrors: messages.length > 0 });
});

router.post('/signup',passport.authenticate('local.signup',{
  successRedirect: '/users/profile',
  failureRedirect: '/users/signup',
  failureFlash: true
}))

router.get('/profile', function(req, res, next){
  res.render('users/profile')
})

module.exports = router;
