const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    id:{
        required : true,
        type :Number
    },
    titre: {
        required: true,
        type: String
    },
    descreption:{
        required:false,
        type:String
    },
    categorie : {
       required:false,
       type:String
    },
    ref:{
        required:true,
        type :Number
    },
    author:{
        required:true,
        type :String
    }
})

module.exports = mongoose.model('Blog', blogSchema)