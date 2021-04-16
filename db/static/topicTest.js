//client side javascript file  if quizid starts with begining of topic id show quiz id
const topic = document.getElementById('topic-id');


function getAccount() {
    var req = new XMLHttpRequest()
    req.open("GET", "/", true);
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            draw(JSON.parse(req.responseText)[0]);
        }
    }
    req.send();
}
//retrieve the query from database 
function getQuestion(){
    var req = new XMLHttpRequest()
    req.open("GET", "/questionFromQuiz/0", true);
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
           callForPrint(JSON.parse(req.responseText)[0].question_text);
        }
    }
    req.send();
}
// submitButton.addEventListener('click',() => {
//    userText = database.user;
//    passText = database.pass; 
// });

function callForPrint(text){
    var bod = document.getElementById("topic_id");
    bod.appendChild(document.createTextNode(text));
    //create text node  and then append it to the index page for example its body
}
function addAccount(student_num, first_name) {
    var req = new XMLHttpRequest();
    req.open("POST", "/addAcc/" + student_num + "/" + first_name + "/" );
    req.send();
    }

getQuestion();
doStuff();
addAccount();
function doStuff() {
    console.log("testtest");
    var sec = document.createElement("section");
    var bod = document.getElementById("test_id");
    
    bod.appendChild(sec);

    sec.appendChild(document.createTextNode("testtestetetstetstets"));
}
const server = app.listen(8044);

