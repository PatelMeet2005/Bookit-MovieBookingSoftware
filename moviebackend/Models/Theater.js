const mongoose = require('mongoose');

const TheaterScheama = new mongoose.Schema({
    theaterName : {type:String,required:true},
    theaterLocation : {type:String,required:true}
});

module.exports = mongoose.model('Theater',TheaterScheama,'Theater');