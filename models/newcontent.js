const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const newcontentSchema = new mongoose.Schema({
    title: String,
    desc: String,
    forums: [ {
            type: Schema.Types.ObjectId,
            ref: "Forum",
                }
            ]
}) 

module.exports = mongoose.model('Newcontent', newcontentSchema);