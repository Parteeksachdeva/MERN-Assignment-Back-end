const mongoose = require("mongoose")

const itemScema = mongoose.Schema({
    message:String,
    email:String,
    createdAt:{
        type:Date,
        default: new Date()
    },
});

const itemDetail = mongoose.model('items',itemScema)
module.exports = itemDetail;