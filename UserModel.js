var mongoose = require('mongoose')

var UsersModel = new mongoose.model('Users', {
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    Age: Number
})

module.exports = UsersModel