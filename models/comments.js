const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var commentsSchema = new mongoose.Schema({
    author: String,
    desc: String,
    date: {
       type: Date, default: new Date
    }
})


module.exports = mongoose.model("Comment", commentsSchema);