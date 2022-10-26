const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersContactsSchema = new Schema({
    id:{
      type: Schema.Types.ObjectId,
    },
    usersContacts:{
        type:Object,
        required: false
    }
})

module.exports = mongoose.model('usersContacts', usersContactsSchema)