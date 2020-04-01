const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    active: {
        type: Boolean,
        default: false
    },
    activetoken: {
        type: String,
        default: mongoose.Types.ObjectId
    },
    registerdate: {
        type: Date,
        default: Date.now
     },
    img: {
        type: String,
        default: 'https://i.imgur.com/VmaOQ5X.png'
    },
    rank: {
        type: Number,
        default: 0
    }

}) 

module.exports = mongoose.model('User', UserSchema);