const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var forumSchema = new mongoose.Schema({
    forumname: String
})


module.exports = mongoose.model("Forum", forumSchema);