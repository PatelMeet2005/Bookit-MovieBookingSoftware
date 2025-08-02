const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({
    name : {type:String, required:true},
    gender : {type:String, required:true},
    email : {type:String, required:true},
    mobile : {type:String, required:true},
    createPassword : {type:String, required:true},
    confirmPassword : {type:String, required:true},
    role : {type:String,default:"user"}

});

module.exports = mongoose.model('Register', RegisterSchema, 'Register');