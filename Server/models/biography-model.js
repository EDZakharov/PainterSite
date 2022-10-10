const mongoose = require('mongoose')
const Schema = mongoose.Schema

const biographySchema = new Schema({
    user: {
        ref: 'user',
        type: Schema.Types.ObjectId
    },
    description: {
        type: String,
        required: false
    },
})

module.exports = mongoose.model('biography', biographySchema)