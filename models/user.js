const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    rank: {
        type: Number,
        default: 0
    }

}) 

module.exports = mongoose.model('User', UserSchema);