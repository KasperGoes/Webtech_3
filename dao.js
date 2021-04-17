/* Data Access Object to handle database connection_serverSideONLY*/
const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const path = require('path');
const app = express();
var http = require('http');
app.use(express.static("static"));
app.use(express.static("views"));
const sanitizer = require("sanitizer"); 
const router = express.Router();
const bodyParser = require('body-parser');//Basically what the body-parser is which allows express to read the body and then parse that into a Json object that we can understand.
const session = require('express-session');
//set the session.current and in the when quesiton is called
app.use(session({
    secret: 'save-key',
    resave: false,
    saveUninitialized: false,
}));
app.get('/' , (req,res) => {
    res.sendFile(path.join(__dirname,'views/login.html'));
})
// req.session.score = 0
//http.createServer(function (req, res) {
//res.writeHead(200, {'Content-Type': 'text/plain'});
const dbfile = path.resolve(__dirname,'db/student1.1.db'); //where is the file?
/*If a file does not exist, it will be created, otherwise the file will be opened for access  */
const db = new sqlite3.Database(dbfile, (err) =>{
    if (err) {
        return console.error(err.message);
    }
    console.log('connected');
});

//server side
app.get("/index/:student_number", (req, res) => {
    const db = new sqlite3.Database(dbfile);
    db.all("SELECT * FROM student WHERE code = ?", sanitizer.sanitize(req.params.code), (err, rows) => {
        res.send(rows);
    });
//db.close();

    // 2: FROM should always include one (or multiple) table names. row doesn't exist yet in this case
    db.all('SELECT student_name FROM student ORDER BY student_number', [], (err, rows) => {
        // 4: 'if (err) {..}' is sufficient, it queries whether an error exists, and if it does, it prints it
        if (err) {
            console.error(err.message);
        }
        rows.forEach((row) => {
            console.log(row.last_name);
        });
    });
});
app.get ("/getQuestions/:quiz_id/", (req, res) => {
    let currentQuiz = req.session.currentQuizId;
    req.session.currentQuizId = req.params.quiz_id;
    //console.log(req)
    db.all("SELECT * FROM question WHERE (quiz_id==?)",[req.params.quiz_id] ,(err, questionRows)=> {
        // db.all("SELECT * FROM answer WHERE (que_id==?) AND (quiz_id==?) ", (err, answers) => {
        //     console.log(" Testtestetstetstets");
            //res.send({...questionRows[0], answers}); //send the first element return all answers
        //     res.send(questionRows);
        // });
        if (err) {
            console.error(err.message);
        }
        var loggedIn = false;
        if (req.session.loggedIn){
            loggedIn = req.session.loggedIn; // Nu wordt naar client side gestuurd of je bent ingelogd. 
        }
        questionRows.push(loggedIn)
        console.log(questionRows);
        res.send(questionRows)
      });
}); 

app.get('/checksessionprogress', (req, res) => {
    if (req.session.currentQuizId) {
        res.send({available: true, currentQuizId: req.session.currentQuizId});
    } else {
        res.send({available: false});
    }
})



app.get('/register', (req, res) => {
    res.write('hoi')
    }, () => {
        res.end();
    });


app.use(bodyParser.urlencoded({ extended: false}));

app.use(express.static("static")); //files that do not change

//post sth to this rout //why do we do it manually?
app.post('/registerform', (req, res) => {
    var studentid = Math.floor(Math.random() * 100000);
    console.log(req.body.userreg);
    req.session.answeredquestions = []; //Only works if you register first. Not if you use existing login
    res.setHeader('Content-Type', 'application/json');
    console.log('req.body.userreg: '+ req.body.userreg);
    db.run("INSERT INTO student VALUES(?,?,?)", [studentid, req.body.userreg, req.body.passreg], function(err) {
        if (err) {
            return console.log(err.message);
        }
        console.log('A row has been inserted with rowid');
        });
    
        db.run("INSERT INTO score VALUES(?,?,?)", [11, studentid, 0], function(err) {
            if (err) {
                return console.log(err.message);
            }
            });
        
        db.run("INSERT INTO score VALUES(?,?,?)", [12, studentid, 0], function(err) {
            if (err) {
                return console.log(err.message);
            }
            });

        db.run("INSERT INTO score VALUES(?,?,?)", [21, studentid, 0], function(err) {
            if (err) {
                return console.log(err.message);
            }
            });

        db.run("INSERT INTO score VALUES(?,?,?)", [22, studentid, 0], function(err) {
            if (err) {
                return console.log(err.message);
            }
            });
    
        db.run("INSERT INTO score VALUES(?,?,?)", [23, studentid, 0], function(err) {
            if (err) {
                return console.log(err.message);
            }
            });
            
    //db.close();   // insert one row into the langs table //never close your database until you close your server

    console.log('your username is ' + req.body.userreg); //req.body crafts our response
    res.send('Registered successfully');
    }
    );
    

//JS file maakt niet uit. gaat puur op deze. verandert naar userreg. Zo heet het ook in login.html. Lijkt alsof ie login niet pakt. zal is proberen login.html te verplaatsen naar static. Er is iets waardoor index wel werkt en login niet,. zoek dit uit. 
app.post('/loginform', (req, res) => {
    var userName = req.body.userlog;
    var passw = req.body.passlog;
    console.log("username: " + userName)
    console.log(typeof(userName))
    console.log(typeof(passw))
    console.log("password: " + passw)
    if(userName && passw) 
    {
        console.log('Checkking userName: ' + userName + ' password: ' + passw);          
        db.all("SELECT * FROM student WHERE (student_user == ?) AND (student_pass == ?)",[userName, passw], function(err,rows){
            if (err)
            {
                console.log('Error: ' + err);
                req.session.loggedIn = false; //all data known for current user
                console.log('in if')
            }
            else
            {            
                rows.forEach(function (row) {
                    console.log('Login Succ')
                    console.log(row)
                    req.session.activeUser = row.student_id;
                    
                }
                );
                console.log('value of req.session.loggedIn: ' + req.session.loggedIn);
                console.log('req.session.activeUser: ' + req.session.activeUser);
                req.session.loggedIn = true;
                console.log('in else');
                console.log('value of req.session.loggedIn: ' + req.session.loggedIn);
                res.sendFile(path.join(__dirname,'views/login.html'));
            }
        });
    }  
    console.log('Login Fail');
});
//how can I import userAnswer to here? do I need serialize?


app.get ("/checkAnswers/:answer/:quizid/:qid", (req, res) => {
    let currentQuiz = req.session.currentQuizId;
    var userAnswer = req.params.answer;
    // req.session.currentquestion ++;
    db.get("SELECT answer_text FROM answer WHERE (is_correct ==1) AND (que_id==?)", [req.params.qid] , (err,row) => {
        if (row.answer_text == userAnswer) {
            ///ADDED: doe de score + 1 
            if (!req.session.answeredquestions.includes(req.params.qid)){
            db.run("UPDATE score SET student_score == student_score+1 WHERE (student_id == ?) AND (quiz_id == ?)", [req.session.activeUser, req.params.quizid], function(err) {
                if (err) {
                    return console.log(err.message);
                }
                console.log('A row has been inserted with rowid');
                });     
            };
            req.session.answeredquestions.push(req.params.qid);
            res.send([true]); // client side: display congrats text & increment the questionCounter 
        }    
        else {
            res.send([false,row.answer_text,row.relevant_link]) 
        }
    })
    });  

//url/:quiz_id/:que_id  only returns the question
app.get ("/getAnswers/:quizid/:qid", (req, res) => {
    let currentQuiz = req.session.currentQuizId;

    var userAnswer = req.params.answer;
    req.session.currentquestion ++;
    console.log(req.params);
    db.all("SELECT answer_text FROM answer JOIN question on answer.que_id = question.que_id WHERE (question.que_id==?) AND (question.quiz_id==?)",[req.params.qid, req.params.quizid], (err, rows)=> {
        
        if (err) {
            console.error(err.message);
        }
        console.log("===================ANSWERS FOUND================");
        console.log(rows)
        res.send(rows); //send the first element
    });
    
    console.log(req.params.quiz_id);
    
    }); 

app.get('/userinfo', (req, res) => { // CHECK IF GIVEN ANSWER IS CORRECT req.param // Gebruiker moet ingelogd zijn. 
    if (req.session.loggedIn){
        console.log('logged in, save')
        console.log('req.session.activeUser: ' + req.session.activeUser);
    }
    else{
        console.log('eerst nog inloggen')
    }
    db.serialize(( () => {
    db.each('SELECT student_user, student_pass FROM student WHERE student_id == ?', [req.session.activeUser], (err,row) => {
        if (err) {
            console.error(err.message);
        }
        res.send(row);//q?
    }, () => {
        res.end();
    });
}));
});

app.get('/userinfoscore/:quizid', (req, res) => { // CHECK IF GIVEN ANSWER IS CORRECT req.param // Gebruiker moet ingelogd zijn. 
    if (req.session.loggedIn){
        console.log('logged in, save')
        console.log('req.session.activeUser: ' + req.session.activeUser);
    }
    else{
        console.log('eerst nog inloggen')
    }
    db.serialize(( () => {
    db.each('SELECT student_score, quiz_id FROM score WHERE (student_id == ?) AND (quiz_id == ?)', [req.session.activeUser, req.params.quizid], (err,row) => {
        console.log('we leven nog')
        if (err) {
            console.error(err.message);
        }
        console.log(row)
        res.send(row);//q?
    }, () => {
        res.end();
    });
}));
});

app.post('/changeuser', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    db.run("UPDATE student SET student_user == ? WHERE student_id == ?", [req.body.newusername, req.session.activeUser], function(err) {
        if (err) {
            return console.log(err.message);
        }
        console.log('A row has been inserted with rowid');
        });         
    //db.close();   // insert one row into the langs table //never close your database until you close your server

    console.log('your new username is ' + req.body.newusername); //req.body crafts our response
    res.send('Username changed successfully');
    }
    );

app.post('/changepass', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    db.run("UPDATE student SET student_pass == ? WHERE student_id == ?", [req.body.newpassword, req.session.activeUser], function(err) {
        if (err) {
            return console.log(err.message);
        }
        console.log('A row has been inserted with rowid');
        });         
    //db.close();   // insert one row into the langs table //never close your database until you close your server

    console.log('your new password is ' + req.body.newusername); //req.body crafts our response
    res.send('Password changed successfully');
    }
    );

    const server = app.listen(8044);