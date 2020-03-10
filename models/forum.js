const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var forumSchema = new mongoose.Schema({
    forumname: String,
    topics: [ {
        type: Schema.Types.ObjectId,
        ref: "Topic",
            }
        ]
})


module.exports = mongoose.model("Forum", forumSchema);