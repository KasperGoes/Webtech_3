const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const router = express.Router();
const bodyParser = require('body-parser');//Basically what the body-parser is which allows express to read the body and then parse that into a Json object that we can understand.
let db = new sqlite3.Database('student.db');

//app.use(bodyParser.json()); //use json in response
app.use(bodyParser.urlencoded({ extended: false}));

app.use(express.static("static")); //files that do not change

//post sth to this rout
app.post('/test', (req, res) => {
    console.log(req.body.user);
    res.setHeader('Content-Type', 'application/json');
   db.run("INSERT INTO student VALUES(?,?,?)", [req.body.user, req.body.pass, req.body.user], function(err) {
       if (err) {
         return console.log(err.message);
       }
       console.log('A row has been inserted with rowid');
      });
    
      // close the database connection
    //  db.close();   // insert one row into the langs table //never close your database until you close your server

    console.log('your username is ' + req.body.user); //req.body crafts our response
    res.send('hi');
    });
app.get('/',(req,res)=> {
    res.sendfile("index.html")
});
const server = app.listen(8044);