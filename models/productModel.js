const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    descreption:{
        required:false,
        type:String
    }
})

module.exports = mongoose.model('Data', productSchema)