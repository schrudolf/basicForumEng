const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let commentsSchema = new mongoose.Schema({
    author: String,
    desc: String,
    img: String,
    date: {
       type: Date,
       default: Date.now
    }
})


module.exports = mongoose.model("Comment", commentsSchema);