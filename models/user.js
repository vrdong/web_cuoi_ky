var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
    email: {type: String, require: true},
    password : {type: String, require: true},
    imagePath : {type: String, require: true},
    firstname: {type: String, require: true},
    lastname: {type: String, require: true},
    address: {type: String, require: true},
    admin: {type: Number, required: true},
    banned: {type: Boolean, required: true}
});

userSchema.methods.encryptPassword =  function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null );
}

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}
module.exports = mongoose.model('User', userSchema);