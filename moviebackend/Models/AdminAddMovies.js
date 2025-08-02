const mongoose = require('mongoose');

const AdminAddMoviesSchema = new mongoose.Schema({
    movieName : {type:String,required:true},
    releaseDate : {type:String,required:true},
    director : {type:String,required:true},
    actors : {type:String,required:true},
    actress : {type:String,required:true},
    trailerlink : {type:String,required:true},
    photo : {type:String,required:true},
    description : {type:String,required:true},
    banner : {type:String,required:true},

});

module.exports = mongoose.model('AdminAddMovie',AdminAddMoviesSchema,'AdminAddMovie');