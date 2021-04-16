//client side javascript file
const submitButton = document.getElementById('submit-btn');
const userText = document.getElementById('user');
const passText = document.getElementById('pass');


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
function getStuendtnumber(){
    var req = new XMLHttpRequest()
    req.open("GET", "/index/1112", true);
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
           callForPrint(req.responseText);
        }
    }
    req.send();   
}
// submitButton.addEventListener('click',() => {
//    userText = database.user;
//    passText = database.pass; 
// });

function callForPrint(text){
    var bod = document.getElementById("test_id");
    bod.appendChild(document.createTextNode(text));
    //create text node  and then append it to the index page for example its body
}
function addAccount(student_num, first_name) {
    var req = new XMLHttpRequest();
    req.open("POST", "/addAcc/" + student_num + "/" + first_name + "/" );
    req.send();
    }

getStuendtnumber();
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

