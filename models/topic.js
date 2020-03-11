const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newtopicSchema = new mongoose.Schema({
    title: String,
    author: String,
    desc: String,
    date: {
        type: Date, default: new Date
    },
    comments: [ {
        type: Schema.Types.ObjectId,
        ref: "Comment",
            }
        ]
}) 

module.exports = mongoose.model('Topic', newtopicSchema);