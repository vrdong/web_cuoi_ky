var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Cate = require('../models/category');
var Cart = require('../models/cart');
var Order =  require('../models/order');


/* GET home page. */
router.get('/', function (req, res, next) {
  Cate.find().then(function (cates) {
    Product.find({ type: 1 }).limit(4).then((woods) => {
      Product.find({ type: 2 }).limit(4).then((composites) => {
        Product.find({ type: 3 }).limit(4).then((combos) => {
          var Category = [];
          Category.push({ cate: cates[0], products: woods });
          Category.push({ cate: cates[1], products: composites });
          Category.push({ cate: cates[2], products: combos });
          res.render('index', { cates: Category });
        })
      })
    })
  })
});

router.get('/add-to-cart/:id', function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  Product.findById(productId, function (err, product) {
    if (err) {
      console.log(err);
      return res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/');
  })
})

router.get('/shopping-cart', function (req, res, next) {
  if (!req.session.cart) {
    return res.render('shop/shopping-cart', { products: null });
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart', { products: cart.generateArray(), totalPrice: cart.totalPrice, totalQty: cart.totalQty });
})


// Checkout
router.get('/checkout',isLoggedIn, function (req, res, next) {
  if (!req.session.cart) {
    return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/checkout', {  products: cart.generateArray(), totalPrice: cart.totalPrice, totalQty: cart.totalQty});

})
router.get('/paymentmethod', function(req, res, next){
  res.render('shop/paymentmethod');
})

router.post('/order', function(req, res, next){
  var cart = new Cart(req.session.cart);
  var paymentId = req.user._id + '-' + Date.now();
  var order =  new Order({
    user: req.user,
    cart: cart,
    address: req.body.address,
    phone: req.body.phone,
    name: req.body.firstname + ' ' +  req.body.lastname,
    status: 'pending',
    type: 0,
    paymentId: paymentId
  });
  //  console.log(paymentId);
  req.session.paymentId = paymentId;
 // console.log(req.session.paymentId);
  order.save(function(err, result){
    //console.log(err);
  })
  res.redirect('/paymentmethod');
})

router.post('/cod', function(req, res, next){
  //console.log(req.session.paymentId);
  Order.collection.updateOne({paymentId: req.session.paymentId}, {'$set' : {type: 1}},{ upsert: true });
  req.session.cart = null;
  req.session.paymentId = null;
  res.redirect('/');
})

router.get('/design', function(req, res, next){
  res.render('design.hbs');
})


module.exports = router;
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.oldUrl = req.url;
  res.redirect('/users/signin');
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

