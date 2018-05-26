var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {type: String, require: true},
    password : {type: String, require: true}
});

module.exports = mongoose.model('User',userSchema);