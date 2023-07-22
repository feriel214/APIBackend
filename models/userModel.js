const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id:{
        required : true,
        type :Number
    },
    firstName: {
        required: true,
        type: String
    },
    tel:{
        required:false,
        type:Number
    },
   
})

module.exports = mongoose.model('User', userSchema)