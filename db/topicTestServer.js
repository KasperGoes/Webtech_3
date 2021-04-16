/* Data Access Object to handle database connection_serverSideONLY*/
const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const path = require('path');
const app = express();
var http = require('http');
app.use(express.static("static"));
const sanitizer = require("sanitizer"); 

app.get('/' , (req,res) => {
    res.sendFile(path.join(__dirname,'/static/index.html'));
})

//http.createServer(function (req, res) {
//res.writeHead(200, {'Content-Type': 'text/plain'});
const dbTopic = path.resolve(__dirname,'topic.db'); //where is the file?
const dbQuiz = path.resolve(__dirname,'quiz.db'); 
const dbQuestion = path.resolve(__dirname,'question.db'); 

/*If a file does not exist, it will be created, otherwise the file will be opened for access  */
/*const dbT = new sqlite3.Database(dbTopic, (err) =>{ 
    if (err) {
        return console.error(err.message);
    }
    console.log('connected');
});
const dbQ = new sqlite3.Database(dbQuiz, (err) =>{ 
    if (err) {
        return console.error(err.message);
    }
    console.log('connected');
});
const dbQu = new sqlite3.Database(dbQuestion, (err) =>{ 
    if (err) {
        return console.error(err.message);
    }
    console.log('connected');
});*/
//server side
app.get("/questionFromQuiz/:quiz_id", (req, res) => {
    const db = new sqlite3.Database(dbQuestion);
    db.all("SELECT * FROM question WHERE quiz_id = question_id", /*sanitizer.sanitize(req.params.quiz_id), */(err, rows) => {
        res.send(rows);
        res.end();
    });
//db.close();
});
/*As we want to create tables and then query the data, we call the DB in a serialized mode   */
app.get('/showQuestion', (req, res) => {
    db.serialize(( () => {
    db.each('SELECT question_text as question FROM question WHERE topic_id=question_id ', (err,row) => {
        if (err) {
            console.error(err.message);
        }
        res.write(JSON.stringify(row));//q?
        console.log(row.name);
    }, () => {
        res.end();
    });
    // 2: FROM should always include one (or multiple) table names. row doesn't exist yet in this case
    db.all('SELECT last_name FROM student ORDER BY student_number', [], (err, rows) => {
        // 4: 'if (err) {..}' is sufficient, it queries whether an error exists, and if it does, it prints it
        if (err) {
            console.error(err.message);
        }
        rows.forEach((row) => {
            console.log(row.last_name);
        });
    });
}));
});
//app.post

/*CLOSE database*/

// 5: free little db closing function :)
// db.close((err) => {
//     if (err) {
//         return console.error(err.message);
//     }
//     console.log("connection closed");
// }); 
// })

const server = app.listen(8044);