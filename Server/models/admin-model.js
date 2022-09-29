const {Schema, model} = require('mongoose')

const AdminSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false}
})

module.exports = model('admin', AdminSchema)