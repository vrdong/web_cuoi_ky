var Cate = require('../models/category');
var mongoose = require('mongoose');

mongoose.connect('mongodb://vrdong:Dong123456@ds016298.mlab.com:16298/web_cuoi_ky')

var cates =  [
    new Cate({
        id: 1,
        name: 'Wood'
    }),
    new Cate({
        id: 2,
        name: 'Composite'
    }),
    new Cate({
        id: 3,
        name: 'Combo'
    })
];

var done = 0;
for(var i = 0; i < cates.length; i++){
    cates[i].save(function(err,result){
        done++;
        if (done === cates.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}   
