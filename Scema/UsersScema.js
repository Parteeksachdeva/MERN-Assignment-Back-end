const mongoose = require("mongoose")

const UserScema = mongoose.Schema({
    firstname:String,
    lastname:String,
    email: String,
    password: String,
    birthday: String,
    admin: Boolean,
    createdAt:{
        type:Date,
        default: new Date()
    },
});

const UserDetail = mongoose.model('User',UserScema)
module.exports = UserDetail;