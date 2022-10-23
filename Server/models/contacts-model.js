const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactsSchema = new Schema({
    user: {
        ref: 'user',
        type: Schema.Types.ObjectId
    },
    contacts: {
        type: Object,
        required: true
    },
})

module.exports = mongoose.model('contacts', contactsSchema)