var Cart = require('../models/cart');
module.exports = function (app, paypal) {
    app.post('/paypal', function (req, res, next) {
        console.log('asdkjasdljaldj');
        //var cart = new Cart(req.session.cart);
        console.log(req.session.cart);
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
                    "items": [{
                        "name": "item",
                        "sku": "item",
                        "price": "10.00",
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": "10.00"
                },
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
    // bị sao v ta đờ mờ
    app.get('/success', function (req, res) {
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
        var execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": "10.00"
                }
            }]
        };
        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                console.log(JSON.stringify(payment));
                res.send('Success')
            }
        });
    });

    app.get('/cancel', function (req, res) {
        res.send('canceld!')
    })

}