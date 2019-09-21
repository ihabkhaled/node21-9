var mongoose = require('mongoose')

var StudentsModel = new mongoose.model('Students', {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    phone: String,
    age: Number,
    address: String
})

module.exports = StudentsModel