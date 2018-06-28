var express = require('express');
var router = express.Router();
var passport = require('passport');
const request = require('request');
const multer = require('multer');
var path = require('path');
var User = require('../models/user');
var Order = require('../models/order');
var Cart = require('../models/cart');

//Set Storage 
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('myImage');

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

var csrf = require('csurf');

var csrfProtection = csrf();

router.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    console.log(err);
    var messages = [];
    if (err) {
      messages = [err];
      res.render('users/profile', { hasErrors: 1, messages: messages });
    } else {
      if (req.file == undefined) {
        messages = ['Error: No File Selected!'];
        res.render('users/profile', { hasErrors: 1, messages: messages });
      } else {
        User.collection.updateOne({ _id: req.user._id }, { '$set': { imagePath: req.file.filename } }, { upsert: true });
        User.findOne({ _id: req.user._id }).then((user) => {
          messages = ['File Uploaded!'];
          if (user.imagePath == null) {
            imagePath = "http://via.placeholder.com/150x150";
          } else {
            imagePath = user.imagePath;
          }
          if (user.firstname == undefined && user.lastname == undefined) {
            name = "Anonymous"
            firstname = "none";
            lastname = "none";
          } else {
            name = firstname + lastname;
          }
          if (user.address == undefined) {
            address = "Somewhere";
          } else {
            address = user.address;
          }
          res.render('users/profile', { hasErrors: 0, messages: messages, email: user.email, file: `/uploads/${imagePath}`, name: name, address: address, firstname: user.firstname, lastname: user.lastname })
        })
      }
    }
  });
});
router.post('/profile', function (req, res, next) {
  if (req.body.firstname != '') {
    User.collection.updateOne({ _id: req.user._id }, { '$set': { firstname: req.body.firstname } }, { upsert: true });
  }

  if (req.body.lastname != '') {
    User.collection.updateOne({ _id: req.user._id }, { '$set': { lastname: req.body.lastname } }, { upsert: true });
  }

  if (req.body.address != '') {
    User.collection.updateOne({ _id: req.user._id }, { '$set': { address: req.body.address } }, { upsert: true });
  }
  // console.log(req.body.password);
  if (req.body.password != '') {
    var newUser = User();
    newUser.password = newUser.encryptPassword(req.body.password);
    User.collection.updateOne({ _id: req.user._id }, { '$set': { password: newUser.password } }, { upsert: true });
  }
  res.redirect('/users/profile');
})
router.use(csrfProtection);

router.get('/profile', isLoggedIn, function (req, res, next) {
  console.log(req.user.admin);
  Order.find({ user: req.user }, function (err, orders) {
    if (err) {
      return res.write('Error');
    }
    req.session.historyOrder = orders;
  });
  User.findOne({ _id: req.user._id }).then((user) => {
    console.log(user.imagePath);
    if (user.imagePath == null) {
      imagePath = "http://via.placeholder.com/150x150";
    } else {
      imagePath = `/uploads/${user.imagePath}`;
    }
    if (user.firstname === undefined && user.lastname === undefined) {
      name = "Anonymous"
      firstname = "none";
      lastname = "none";
    } else {
      name = user.firstname + user.lastname;
    }
    if (user.address === undefined) {
      address = "Somewhere";
    } else {
      address = user.address;
    }
    orders = req.session.historyOrder;
    var cart;
    if (orders != null) {
      orders.forEach(function (order) {
        cart = new Cart(order.cart);
        var x = cart.generateArray();
        order.item = null;
        order.item = x;
      })
    }
    res.render('users/profile', {email: user.email, file: imagePath, name: name, address: address, firstname: user.firstname, lastname: user.lastname, orders: orders })
  })
})


router.get('/logout', isLoggedIn, function (req, res, next) {
  req.session.admin = null;
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

router.post('/signup', function (req, res, next) {
  var captcha = req.body['g-recaptcha-response'];
  if (
    captcha === undefined ||
    captcha === '' ||
    captcha === null
  ) {
    return res.render('users/signin', { csrfToken: req.csrfToken(), msg: "Failed captcha verification" });
  }
  // Secret Key
  const secretKey = '	6Lc-BGAUAAAAAPOgorFcX1WFSPQWnnU9VpIMt3W_';

  // Verify URL
  const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}&remoteip=${req.connection.remoteAddress}`;

  // Make Request To VerifyURL
  request(verifyUrl, (err, response, body) => {
    body = JSON.parse(body);
    //console.log(body);

    // If Not Successful
    if (body.success !== undefined && !body.success) {
      return res.render('users/signin', { csrfToken: req.csrfToken(), msg: "Failed captcha verification" });
    }

    //If Successful
    return next();
  })

},passport.authenticate('local.signup', {
  failureRedirect: '/users/signup',
  failureFlash: true
}), function (req, res, next) {
  if (req.session.oldUrl) {
    var oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  } else {
    res.redirect('/users/profile');
  }
})

router.get('/signin', function (req, res, next) {
  var messages = req.flash('error');

  res.render('users/signin', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
})

router.post('/signin', passport.authenticate('local.signin', {
  // successRedirect: '/',
  failureRedirect: '/users/signin',
  failureFlash: true
}), function (req, res, next) {
  if (req.user.admin == 1) {
    req.session.admin = true;
  } else {
    req.session.admin = false;
  }
  if (req.session.oldUrl) {
    var oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  } else {
    res.redirect('/users/profile');
  }
})



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

