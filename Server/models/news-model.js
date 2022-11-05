const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newsSchema = new Schema({
    user: {
        ref: 'user',
        type: Schema.Types.ObjectId
    },
    imageSrc: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: false
    },
    longDescription:{
        type: String,
        required: false
    }


})

module.exports = mongoose.model('news', newsSchema)