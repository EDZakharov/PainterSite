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
    imageName: {
        type: String,
        required: true,
        default: ''
    },
    description: {
        type: String,
        required: false
    },
    imageSrc: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        required: true,
        default: ''
    },
    sizes: {
        type: String,
        required: true,
        default: ''
    },
})

module.exports = mongoose.model('uploads', imagesSchema)