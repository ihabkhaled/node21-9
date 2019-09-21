var express = require('express')
var app = express()
var mongoose = require('mongoose')
var StudentsModel = require('./StudentModel')

app.use(express.json())

mongoose.connect('mongodb://localhost:27017/schooldb')

app.get('/', (req, resp) => {
    resp.send('server is running...')
})

app.post('/insertstudent', (req, resp) => {
    const { student_name, age, phone, address } = req.body // 1- a5dt el data mn el body bta3 el request

    var student = new StudentsModel({ // 3mlt object gded mn el Model bta3t students maleto bl data ely mn el body
        _id: mongoose.Types.ObjectId(),
        name: student_name,
        age: age,
        address: address,
        phone: phone
    })

    student.save((err, data) => { // save fl database
        if (err) {
            resp.json({ message: 'error' })
        } else {
            resp.json({ message: 'success' })
        }
    })

})

app.get('/getallstudents', (req, resp) => {
    StudentsModel.find({}, (err, data) => {
        if (err) {
            resp.json({ message: 'error' })
        } else {
            resp.json({ message: 'success', result: data })
        }
    })
})


app.listen(8085)