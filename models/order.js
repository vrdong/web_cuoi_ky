var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 var schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    cart: {type: Object, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
    name:{type: String, required:  true},
    paymentId: {type: String, required: true},
    status: {type: String, required: true},
    type: {type: Number, required: true}
 });
 module.exports = mongoose.model('Order',schema);