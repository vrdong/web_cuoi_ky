var express = require('express');
var router = express.Router();
const request = require('request');
const multer = require('multer');
var path = require('path');
var Order = require('../models/order');
var User = require('../models/user');
var Product = require('../models/product');

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

router.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        console.log(err);
        var messages = [];
        if (err) {
            messages = [err];
            res.render('admin/add', { hasErrors: 1, messages: messages });
        } else {
            if (req.file == undefined) {
                messages = ['Error: No File Selected!'];
                res.render('admin/add', { hasErrors: 1, messages: messages });
            } else {
                messages = ['File Uploaded!'];
                res.render('admin/add', { hasErrors: 0, messages: messages, file: `/uploads/${req.file.filename}` })
            }
        }
    });
});
router.get('/order-manage', isAdmin, function (req, res, next) {
    Order.find({}).sort({ 'added': -1 }).exec(function (err, docs) {
        if (err) {
            return res.render('error', { message: err });
        }
        return res.render('admin/order-manage', { title: 'Order List', orders: docs });
    });
});

router.get('/member-manage', isAdmin, function (req, res, next) {
    User.find({ admin: 0 }).exec(function (err, docs) {
        if (err) {
            return res.render('error', { message: err });
        }
        return res.render('admin/member-manage', { title: 'Member List', users: docs });
    });
});

router.get('/product-manage', isAdmin, function (req, res, next) {
    Product.find().exec(function (err, docs) {
        if (err) {
            return res.render('error', { message: err });
        }
        return res.render('admin/product-manage', { title: 'Product List', products: docs });
    });
});

router.get('/delete/:id', isAdmin, function (req, res, next) {
    //Some code here
    var productId = req.params.id;
});

router.post('/edit', isAdmin, function (req, res, next) {
    //Some code here
    var productId = req.body.id;
    Product.findById({ "_id": productId }).exec(function (err, docs) {
        if (err) {
            return res.render('error', { message: err });
        }
        console.log(docs);
        return res.render('admin/edit', { title: 'Edit Product', product: docs });
    })
})

router.post('/editproduct', isAdmin, function (req, res, next) {
    var id = req.body.id;
    var title = req.body.title;
    console.log(title);
    Product.updateOne(
        { '_id': id },
        {
            '$set': {
                title: title,
                price: req.body.price,
                description: req.body.description
            }
        }).then(function () {
            return res.redirect('/admin/product-manage');
        })
})
router.get('/add', isAdmin, function (req, res, next) {
    res.render('admin/add');
});

router.post('/add', isAdmin, function (req, res, next) {
    var model, size, material;
    var imagePath;
    imagePath = `/uploads/${req.body.image}`;
    switch (req.body.model) {
        case 1: model = 'khung-t'
            break;
        case 2: model = 'khung-b'
            break;
        case 3: model = 'khung-a'
            break;
    }
    switch (req.body.material) {
        case 1: material = 'cl-go'
            break;
        case 2: material = 'cl-kt'
            break;
        case 3: material = 'cl-nh'
            break;
        case 4: material = 'cl-ve'
    }
    switch (req.body.size) {
        case 1: size = 'kt-1'
            break;
        case 1: size = 'kt-2'
            break;
        case 1: size = 'kt-3'
            break;
        case 1: size = 'kt-4'
            break;
        case 1: size = 'kt-5'
            break;


    }
    Product.insertMany(
        {
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            khung: model,
            cl: material,
            kt: size,
            imagePath: imagePath 
        }
    ).then(function () {
        return res.redirect('/admin/product-manage');
    })
})

router.post('/delete', isAdmin, function (req, res, next) {
    //Some code here
    var productId = req.body.id;
    Product.remove({ "_id": productId }).then(function(){
        return res.redirect('/admin/product-manage');
    })
})
module.exports = router;

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && (req.user.admin == 1)) {
        return next();
    }
    res.redirect('/');
}