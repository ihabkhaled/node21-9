// steps : 
// 1- reuqire('express')  3la 5atwten
// create server app.listen()
// create apis ( get , post)
// est5dm el use function 3shan el middle ware w a5ly express btshof el body


////////////////////////////////////////////////////////////////


var hamada = require('express')
var app = hamada()
var fs = require('fs')

app.use(hamada.json()) //middleware

////////////////////////////////////////////////////////////////

app.get('/', (req, resp) => {
    resp.send('server is running.....')
})

/////////////////////////////////////////////////////////

app.get('/getallstudents', (req, resp) => {
    let students = [{ id: 1, name: 'mahmoud', role: 'student1' },
    { id: 2, name: 'mona', role: 'student2' },
    { id: 3, name: 'kareem', role: 'student3' }
    ]
    resp.json(students)
})

/////////////////////////////////////////////////////////

app.get('/getallteachers', (req, resp) => {
    let teachers = [{ id: 1, name: 'mahmoud', role: 'Manager' },
    { id: 2, name: 'mona', role: 'teacher1' },
    { id: 3, name: 'kareem', role: 'teacher2' }
    ]

    resp.json(teachers)
})

/////////////////////////////////////////////////////////


app.get('/readfile', (req, resp) => {
    fs.readFile('index.txt', (error, data) => {
        resp.end(data)
    })
})

app.post('/insertstudent', (req, resp) => {
    let { user_name, age } = req.body
    resp.json({ name: user_name, myAge: age + 10 })

})




app.listen(8086) // el function de btsh9al el server 3la port 8085