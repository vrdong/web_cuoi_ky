var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect('mongodb://vrdong:Dong123456@ds016298.mlab.com:16298/web_cuoi_ky')

var products =  [ 
    new Product({
        imagePath: '/images/frames/wood/wood1.jpg',
        title: 'Khung gỗ đen',
        description: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
        price: 10,
        type: 1,
        khung: 'khung-t',
        cl: 'cl-go',
        kt: 'kt-1'
    }),
    new Product({
        imagePath: '/images/frames/wood/wood2.jpg',
        title: 'Khung gỗ trắng',
        description: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
        price: 10,
        type: 1,
        khung: 'khung-a',
        cl: 'cl-kl',
        kt: 'kt-2'
    }),
    new Product({
        imagePath: '/images/frames/wood/wood3.jpg',
        title: 'Khung gỗ vàng',
        description: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
        price: 10,
        type: 1,
        khung: 'khung-b',
        cl: 'cl-nh',
        kt: 'kt-3'
    }),
    new Product({
        imagePath: '/images/frames/wood/wood4.jpg',
        title: 'Khung gỗ đen dày',
        description: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
        price: 15,
        type: 1,
        khung: 'khung-t',
        cl: 'cl-ve',
        kt: 'kt-4'
    }),
    new Product({
        imagePath: '/images/frames/wood/wood5.jpg',
        title: 'Khung gỗ vàng cổ điển',
        description: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
        price: 20,
        type: 1,
        khung: 'khung-a',
        cl: 'cl-go',
        kt: 'kt-5'
    }),
    new Product({
        imagePath: '/images/frames/wood/wood6.jpg',
        title: 'Khung gỗ nâu',
        description: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
        price: 20,
        type: 1,
        khung: 'khung-b',
        cl: 'cl-kl',
        kt: 'kt-1'
    }),
    new Product({
        imagePath: '/images/frames/wood/wood7.jpg',
        title: 'Khung gỗ vàng hiện đại',
        description: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
        price: 25,
        type: 1,
        khung: 'khung-t',
        cl: 'cl-nh',
        kt: 'kt-2'
    }),
    new Product({
        imagePath: '/images/frames/wood/wood8.jpg',
        title: 'Khung gỗ vàng hoa văn',
        description: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
        price: 20,
        type: 1,
        khung: 'khung-a',
        cl: 'cl-ve',
        kt: 'kt-3'
    }),
    new Product({
        imagePath: '/images/frames/composite/composite1.jpg',
        title: 'Khung composite vàng',
        description: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
        price: 10,
        type: 2,
        khung: 'khung-b',
        cl: 'cl-go',
        kt: 'kt-4'
    }),
    new Product({
        imagePath: '/images/frames/composite/composite2.jpg',
        title: 'Khung composite nâu',
        description: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
        price: 10,
        type: 2,
        khung: 'khung-t',
        cl: 'cl-kl',
        kt: 'kt-5'
    }),
    new Product({
        imagePath: '/images/frames/composite/composite3.jpg',
        title: 'Khung composite trắng',
        description: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
        price: 10,
        type: 2,
        khung: 'khung-a',
        cl: 'cl-nh',
        kt: 'kt-1'
    }),
    new Product({
        imagePath: '/images/frames/composite/composite4.jpg',
        title: 'Khung composite vàng hoa văn',
        description: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
        price: 15,
        type: 2,
        khung: 'khung-b',
        cl: 'cl-ve',
        kt: 'kt-2'
    }),
    new Product({
        imagePath: '/images/frames/composite/composite5.jpg',
        title: 'Khung composite trắng hoa văn',
        description: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
        price: 15,
        type: 2,
        khung: 'khung-t',
        cl: 'cl-go',
        kt: 'kt-3'
    }),
    new Product({
        imagePath: '/images/frames/composite/composite6.jpg',
        title: 'Khung composite trắng hoa văn 2',
        description: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
        price: 15,
        type: 2,
        khung: 'khung-a',
        cl: 'cl-kl',
        kt: 'kt-4'
    }),
    new Product({
        imagePath: '/images/frames/composite/composite7.jpg',
        title: 'Khung composite trắng cổ điển',
        description: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
        price: 20,
        type: 2,
        khung: 'khung-b',
        cl: 'cl-nh',
        kt: 'kt-5'
    }),
    new Product({
        imagePath: '/images/frames/composite/composite8.jpg',
        title: 'Khung composite trắng hiện đại',
        description: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
        price: 20,
        type: 2,
        khung: 'khung-t',
        cl: 'cl-ve',
        kt: 'kt-1'
    }),
    new Product({
        imagePath: '/images/frames/combo/set1.jpg',
        title: 'Khung tranh treo tường bộ 1',
        description: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
        price: 50,
        type: 3,
        khung: 'khung-a',
        cl: 'cl-go',
        kt: 'kt-2'
    }),
    new Product({
        imagePath: '/images/frames/combo/set2.jpg',
        title: 'Khung tranh treo tường bộ 2',
        description: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
        price: 50,
        type: 3,
        khung: 'khung-b',
        cl: 'cl-kl',
        kt: 'kt-3'
    }),
    new Product({
        imagePath: '/images/frames/combo/set3.jpg',
        title: 'Khung tranh treo tường bộ 3',
        description: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
        price: 50,
        type: 3,
        khung: 'khung-t',
        cl: 'cl-nh',
        kt: 'kt-4'
    }),
    new Product({
        imagePath: '/images/frames/combo/set4.jpg',
        title: 'Khung tranh treo tường bộ 4',
        description: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
        price: 75,
        type: 3,
        khung: 'khung-a',
        cl: 'cl-ve',
        kt: 'kt-5'
    }),
    new Product({
        imagePath: '/images/frames/combo/set5.jpg',
        title: 'Khung tranh treo tường bộ 5',
        description: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
        price: 80,
        type: 3,
        khung: 'khung-b',
        cl: 'cl-go',
        kt: 'kt-1'
    }),
    new Product({
        imagePath: '/images/frames/combo/set6.jpg',
        title: 'Khung tranh treo tường bộ 6',
        description: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
        price: 80,
        type: 3,
        khung: 'khung-t',
        cl: 'cl-kl',
        kt: 'kt-2'
    }),
    new Product({
        imagePath: '/images/frames/combo/set7.jpg',
        title: 'Khung tranh treo tường bộ 7',
        description: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
        price: 100,
        type: 3,
        khung: 'khung-a',
        cl: 'cl-nh',
        kt: 'kt-3'
    }),
    new Product({
        imagePath: '/images/frames/combo/set8.jpg',
        title: 'Khung tranh treo tường bộ 8',
        description: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
        price: 100,
        type: 3,
        khung: 'khung-b',
        cl: 'cl-ve',
        kt: 'kt-4'
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
