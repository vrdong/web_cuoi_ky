var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 var schema = new Schema({
    imagePath: {type: String, requrie: true},
    title: {type: String, require: true},
    description: {type: String, require: true},
    price: {type: Number, require: true},
    type: {type: Number, require: true},
    khung: {type: String, require: true},
    cl: {type: String, require: true},
    kt: {type: String, require: true}
 });

 module.exports = mongoose.model('Product',schema);