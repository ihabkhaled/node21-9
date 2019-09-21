var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var UsersModel = require('./UserModel')

app = express();

app.use(express.json()) // middleware

mongoose.connect('mongodb://localhost:27017/usersdb', { useNewUrlParser: true, useUnifiedTopology: true })

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    console.log("Database created!");

    var dbo = db.db("mydb");
    dbo.createCollection("users", function (err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
});


// By mongoose
app.get('/getAllUsers', (req, resp) => {
    UsersModel.find({}, (err, result) => {
        if (err) {
            resp.json({ message: 'error' })
        } else {
            resp.send(result)
        }
    })
})

app.post('/insertMongoose', (req, resp) => {
    let { user_name, age } = req.body;
    var user = new UsersModel({
        _id: mongoose.Types.ObjectId(),
        username: user_name,
        Age: age
    })
    console.log(user);
    user.save((err, result) => {
        if (err) {
            resp.json({ message: 'error' })
        } else {
            resp.json({ message: 'Insertion success' })
        }
    })
})

app.get("/getUsers", (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        // Retrive all by classic mongo
        dbo.collection("users").find({}).toArray((err, result) => {
            if (err) throw err;
            else {
                var length = result.length;
                for (let i = 0; i < length; i++) {
                    res.write("ID: " + result[i]._id + " => Username: " + result[i].user_name + "\n")
                }
                res.end()
            }
        })
        db.close();
    });
})

app.get("/", (req, res) => {
    //Get request parameters
    var user_name_get = req.query.username

    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var query = {};
        if (user_name_get) {
            query = { user_name: user_name_get };
        }
        else {
            query = { user_name: "ihab" };
        }
        //Find query
        dbo.collection("users").find(query).toArray((err, result) => {
            if (err) throw err;
            res.write(result)
            res.end()
        })
        db.close();
    });
})

app.post('/login', (req, resp) => {
    // send data to this and it will print them user_name and password
    let { user, pass } = req.body
    resp.end(req.body.user_name + "\n" + req.body.password);
})

app.post('/register', (req, resp) => {

    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) {
            console.log("DB error");
            resp.write("DB error");
            resp.end();
        }
        else {
            var dbo = db.db("mydb");

            //Variables will be inserted
            var username = req.body.user_name;
            var password = req.body.password;

            if (!username || !password) {
                console.log("Username or password is empty");
                resp.write("Username or password is empty");
                resp.end();
            }
            else {
                dbo.collection("users").findOne({ user_name: req.body.user_name }, function (err, result) {
                    if (err) {
                        console.log("collection error");
                        resp.write("collection error");
                        resp.end();
                    }
                    else {
                        if (result) {
                            //already exist
                            console.log(result.user_name);
                            resp.write(result.user_name + " is already exist");
                            resp.end();
                        }
                        else {
                            var myobj = { user_name: username, password: password }
                            //Insert now
                            dbo.collection("users").insertOne(myobj, function (err, result) {
                                if (err) {
                                    resp.write("Insertion error");
                                    resp.end();
                                }
                                else {
                                    resp.write("1 record inserted");
                                    resp.end();
                                }
                            });
                        }
                    }
                    db.close();
                });
            }
        }
    });
})
app.listen(8080);