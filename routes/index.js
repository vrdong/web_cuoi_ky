var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Cate = require('../models/category');
var Cart = require('../models/cart');


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

router.get('/checkout', function (req, res, next) {
  if (!req.session.cart) {
    return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/checkout', { total: cart.totalPrice });

})

module.exports = router;
