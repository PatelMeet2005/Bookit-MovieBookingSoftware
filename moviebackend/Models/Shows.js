const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    showName : {type:String,required:true},
    showStartTime : {type:String,required:true},
    showEndTime : {type:String,required:true},
});

module.exports = mongoose.model('Show',showSchema,'Show');