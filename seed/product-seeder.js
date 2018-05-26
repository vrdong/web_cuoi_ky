var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect('mongodb://vrdong:Dong123456@ds016298.mlab.com:16298/web_cuoi_ky')

var products =  [
    new Product({
    imagePath: 'https://www.jinx.com/productimage/7278/382/1/900.jpg',
    title: 'Team Liquid Jersey Light 2017',
    description: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
    price: 69.99
    }),
    new Product({
        imagePath: 'https://www.jinx.com/productimage/7279/136/1/900.jpg',
        title: 'Team Liquid Jersey Dark 2017',
        description: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
        price: 69.99
    }),
    new Product({
        imagePath: 'https://www.jinx.com/socialimage/7306/387/fb.jpg',
        title: 'Team Liquid Jersey Pink 2017',
        description: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
        price: 69.99
    })
];

var done = 0;
for(var i = 0; i < products.length; i++){
    products[i].save(function(err,result){
        done++;
        if (done === products.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}   
