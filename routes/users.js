var express = require('express');
var router = express.Router();
var passport = require('passport');
const request = require('request');

var csrf = require('csurf');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', isLoggedIn, function (req, res, next) {
  res.render('users/profile')
})

router.get('/logout', isLoggedIn, function (req, res, next) {
  req.logOut();
  res.redirect('/');
})

router.use('/', notLoggedIn, function (req, res, next) {
  next();
})

router.get('/signup', function (req, res, next) {
  var messages = req.flash('error')
  res.render('users/signup', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/',
  failureRedirect: '/users/signup',
  failureFlash: true
}))

router.get('/signin', function (req, res, next) {
  var messages = req.flash('error')
  res.render('users/signin', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
})

router.post('/signin', function (req, res, next) {
  var captcha = req.body['g-recaptcha-response'];
  if (
    captcha === undefined ||
    captcha === '' ||
    captcha === null
  ) {
    return res.render('users/signin', { csrfToken: req.csrfToken(), msg: "Failed captcha verification"});
  }
  // Secret Key
  const secretKey = '	6Lc-BGAUAAAAAPOgorFcX1WFSPQWnnU9VpIMt3W_';

  // Verify URL
  const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}&remoteip=${req.connection.remoteAddress}`;

  // Make Request To VerifyURL
  request(verifyUrl, (err, response, body) => {
    body = JSON.parse(body);
    console.log(body);

    // If Not Successful
    if (body.success !== undefined && !body.success) {
     return res.render('users/signin', { csrfToken: req.csrfToken(), msg: "Failed captcha verification"});
    }

    //If Successful
    return next();
  })

  }, passport.authenticate('local.signin', {
    successRedirect: '/',
    failureRedirect: '/users/signin',
    failureFlash: true
  }))

  module.exports = router;

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  }

  function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  }

