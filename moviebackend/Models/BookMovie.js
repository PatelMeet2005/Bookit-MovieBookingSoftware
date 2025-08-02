const mongoose = require('mongoose');

const BookMovieSchema = new mongoose.Schema({
    movieName : {type:String, required:true},
    bookingDate : {type:String, required:true},
    theatreName : {type:String, required:true},
    showTime : {type:String, required:true},
    NoOfSeats : {type:String},
    seatNumber : {type:[String]},
    reqType : {type:String, enum: ["Registered", "Confirmation"], default: "Registered"},
    reqNumber : {type:String, default: 1},
    paymentMode : {type: String, enum: ["Online", "Offline", null], default: null},
    tax: { type: String, default: null },
    totalPayment: { type: String, default: null }

});

module.exports = mongoose.model('BookMovie', BookMovieSchema, 'BookMovie');