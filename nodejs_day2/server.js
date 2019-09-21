// require --> http
// create server --> createServer().listen
// resp.end() --> btrg3 b response 


var app = require('http')


app.createServer((req, resp) => {

    if (req.url === '/getstudents') {
        resp.end('all students....')

    }
    if (req.url === '/getusers') {

        let users = [
            { id: 1, name: "ahmed" },
            { id: 2, name: "moniem" },
        ]
        users = JSON.stringify(users)
        resp.end(users)
    }
    if (req.url === '/getteachers') {
        let teachers = [
            { id: 1, name: 'mahmoud', role: 'Manager' },
            { id: 2, name: 'mona', role: 'teacher1' },
            { id: 3, name: 'kareem', role: 'teacher2' },
        ]
        teachers = JSON.stringify(teachers)
        resp.end(teachers)
    }
    if (req.url === '/') {
        resp.end('server is runing...')
    } else {
        resp.end('error')
    }
}).listen(8085)