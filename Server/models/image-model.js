const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imagesSchema = new Schema({
    user: {
        ref: 'user',
        type: Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: true
    },
    imageSrc: {
        type: String,
        default: ''
    },

})

module.exports = mongoose.model('uploads', imagesSchema)