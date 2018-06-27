var express = require('express');
var router = express.Router();
var Order = require('../models/order');
var User = require('../models/user');

router.get('/order-manage', isAdmin, function (req, res, next) {
    Order.find({}).sort({ 'added': -1 }).exec(function (err, docs) {
        if (err) {
            return res.render('error', { message: err });
        }
        return res.render('admin/order-manage', { title: 'Danh sách dơn hàng', orders: docs });
    });
});

router.get('/member-manage', isAdmin, function (req, res, next) {
    User.find({admin: 0}).exec(function (err, docs) {
        if (err) {
            return res.render('error', { message: err });
        }
        return res.render('admin/member-manage', { title: 'Danh sách thành viên', users: docs });
    });
});

module.exports = router;

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && (req.user.admin == 1)) {
        return next();
    }
    res.redirect('/');
}