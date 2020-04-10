const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    active: { type: Boolean, default: false},
    ipaddress: {type: String, default: "127.0.0.1"},
    activetoken: {type: String, default: mongoose.Types.ObjectId},
    registerdate: {type: Date, default: Date.now},
    forgottoken: {type: String},
    forgottokenexpire: {type: Date},
    img: {type: String, default: 'https://i.imgur.com/VmaOQ5X.png'},
    upload: {type: Boolean, default: false},
    rank: {type: Number, default: 0}

}) 

module.exports = mongoose.model('User', UserSchema);