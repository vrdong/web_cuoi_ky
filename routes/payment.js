var Cart = require('../models/cart');
var Order = require('../models/order');
module.exports = function (app, paypal) {
    app.post('/paypal', function (req, res, next) {
        var cart = new Cart(req.session.cart);
        var items = [];
        var arr = cart.generateArray();
        for (var i = 0; i < arr.length; i++) {
            items.push({"name": arr[i].item.title, 
            "sku": arr[i].item.description,  
            "price": arr[i].item.price.toString(), 
            "currency": "USD", 
            "quantity": arr[i].qty })
        }
        console.log(items);
        var amount = {"currency": "USD","total": cart.totalPrice.toString()};
        console.log(amount);
        var create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3000/success",
                "cancel_url": "http://localhost:3000/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": items
                },
                "amount": amount,
                "description": "This is the payment description."
            }]
        };
        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                for (let i = 0; i < payment.links.length; i++) {
                    if (payment.links[i].rel === 'approval_url') {
                        res.redirect(payment.links[i].href);
                    }
                }
            }
        });
    })
    app.get('/success', function (req, res) {
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
        var cart = new Cart(req.session.cart);
        var amount = {"currency": "USD","total": cart.totalPrice.toString()};
        var execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": amount
            }]
        };
        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                console.log(JSON.stringify(payment));
                //res.send('Success')
                Order.collection.updateOne({paymentId: req.session.paymentId}, {'$set' : {type: 2, status: 'complete'}},{ upsert: true });
                req.flash('success', 'Successfully bought product!');
                //console.log(paymentId);   
                req.session.cart = null;
                req.session.paymentId = null; 
                res.redirect('/');     
            }
        });
    });
    app.get('/cancel', function (req, res) {
        return res.redirect('/checkout');
    })
}