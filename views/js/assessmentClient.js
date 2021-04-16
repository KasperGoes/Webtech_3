//client side javascript file  if quizid starts with begining of topic id show quiz id
//Make question classes
class Questions {
    constructor(que_id, que_text) {
        this.que_id = que_id;
        this.que_text = que_text
    }
}

class Multiplechoice extends Questions {
    constructor(que_id, que_text) {
        super(que_id, que_text);
        this.answers = [];
    }
    addAnswers(answerOne, answerTwo, answerThree, answerFour) {
        this.answers.push(
            answerOne,
            answerTwo,
            answerThree,
            answerFour
        );
    }
}

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

function get(url) { //parameters toevoegen
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            var demo = document.getElementById('topic1quiz1question1')
            var text = document.createElement('SECTION')
            console.log('req.response: ' + req.response);
            console.log('type: ' + typeof req.response);
            var reqresponseparse = JSON.parse(req.response);
            console.log(reqresponseparse);
            text.appendChild(document.createTextNode(reqresponseparse.que_text))
            demo.appendChild(text)
            if (reqresponseparse.loggedIn) { //if youre logged in. then take the quiz
                var ansform = document.createElement('form');
                ansform.setAttribute('action', '/getAnswers/' + questionCounter);
                ansform.setAttribute('method', 'GET')

                //
                var anstextbox = document.createElement('input');
                anstextbox.setAttribute('type', 'text');
                anstextbox.setAttribute('placeholder', 'Write your answer here');
                anstextbox.setAttribute('name', 'givenanswer');
                //
                var btnanstextbox = document.createElement('input');
                btnanstextbox.setAttribute('type', 'submit');
                btnanstextbox.setAttribute('value', 'submit');
                //
                ansform.appendChild(anstextbox);
                ansform.appendChild(btnanstextbox);
                demo.appendChild(ansform);
                //

            }

        }
    }
    req.send();
}


function showQuestions(quiz_id) {
    var question_id = 1;
    var req = new XMLHttpRequest();
    console.log(' questions were updated');
    // let someEl = document.getElementById("topic" + quiz_id + "div")

    req.open("GET", "/getQuestions/" + quiz_id, true);
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            var question = JSON.parse(req.response);
            console.log(question);
            loggedIn = question.pop()
            question.forEach(elm => openOrMulti(elm, quiz_id, (question_id++).toString(), loggedIn)); //soal++
        }
    }

    // const button = document.createElement('button');//we will need submit button anyway
    // button.classList.add('btn');
    // answerButtonsElement.appendChild(button);
    // var textButton = document.createTextNode("submit");
    // button.appendChild(textButton)
    // button.addEventListener('click', test(qui_id, quiz_id, user_answer));
    // console.log(question); //it contains correct Jason object

    // }
    // }

    req.send()
    window.reqObj = req;

    console.log(' asdf');
}


function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function addAccount(student_num, first_name) {
    var req = new XMLHttpRequest();
    req.open("POST", "/addAcc/" + student_num + "/" + first_name + "/");
    req.send();
}



function callForPrint(text, id) {
    var bod = document.getElementById(id);
    bod.appendChild(document.createTextNode(text));
    //create text node  and then append it to the index page for example its body
}

function showAnswers(quiz_id, qid) {
    // var question_id = 1;
    var req = new XMLHttpRequest();
    console.log(' answers were updated');
    console.log("REQUEST URL: /getAnswers/" + quiz_id + "/" + qid + "/")

    req.open("GET", "/getAnswers/" + quiz_id + "/" + qid + "/", true);
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            var answers = JSON.parse(req.responseText);
            console.log("showAnswers");
            console.log(answers[0]);
            answers.forEach(answer => {
                const button = document.createElement('button');
                var textButton = document.createTextNode(answer.answer_text);
                button.appendChild(textButton)
                button.classList.add('btn');
                document.getElementById("topic" + quiz_id +"question" + qid).appendChild(button);
                button.addEventListener("click", () => test(qid, quiz_id, answer.answer_text));
            })
        }
        window.reqObj = req;

        console.log(' getanswerCheck');
    }
    req.send();
}


function openOrMulti(question, quizid, qid, loggedIn) {
    console.log('showQuestion')
    topicquiz = document.getElementById(quizid)
    quizbtn = document.createElement('BUTTON');
    topicQuestion = document.createElement('DIV');
    topicQuestion.id = "topic" + quizid + "question" + qid;
    topicQuestion.qid = question.que_id;
    quizbtn.appendChild(document.createTextNode('Question ' + qid));
    topicQuestion.appendChild(quizbtn);
    topicquiz.appendChild(topicQuestion);
    quizbtn.id = "question" + quizid + qid + "btn";
    callForPrint(question.que_text, topicQuestion.id)
    if ((question.que_type == "MCQ") && (!loggedIn))
        showAnswers(quizid, qid);
    if (loggedIn) {
        if (question.que_type == "Open") {
            // var questionInst = new Questions(question.que_id, question.que_text);
            var anstextbox = document.createElement('input');
            anstextbox.setAttribute('type', 'text');
            topicQuestion.appendChild(anstextbox);
            anstextbox.setAttribute('placeholder', 'Write your answer here');
            anstextbox.setAttribute('name', 'givenAnswer');//checkAnswer whether given = correct?
            test(qid, quizid, anstextbox.name)
        }
        else {
            var questionInst = new Multiplechoice(question.que_id, question.que_text);
            showAnswers(quizid, qid);
            // questionInst.addAnswers(question.answers);
            //     question.answers.forEach(answer => {
            //         const button = document.createElement('button');
            //         var textButton = document.createTextNode(answer.answer_text);
            //         button.appendChild(textButton)
            //         button.classList.add('btn');
            //         document.getElementById("topic" + quizid[0] + "div").appendChild(button);
            //         button.addEventListener('click', setStatusClass);
            //         if (answer.is_correct) {
            //         //  button.dataset.correct = answer.correct;
            //             button.dataset.correct = answer.getAttribute('data-correct' );

            //         }
            //     })
        }
    }
    else {

    }
}
//produce
function showQuizButton(id) {
    var quiz_id = 1;
    topicdiv = document.getElementById("topic" + id + "div")
    quizbtn = document.createElement('BUTTON');
    quizbtn.id = "quiz" + id + "quest" + id + "btn"
    quizbtn.appendChild(document.createTextNode('Quiz' + quiz_id));//help sometimes I get quiz 1 quiz 1
    quizdiv = document.createElement('DIV');
    quizdiv.id = id + quiz_id.toString();
    quizbtn.addEventListener("click", () => showQuestions(id + quiz_id.toString()));
    topicdiv.appendChild(quizbtn)
    topicdiv.appendChild(quizdiv)

    var req = new XMLHttpRequest();
    req.open("GET", "/getQuizzes/" + id);
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            var json = JSON.parse(req.responseText);
            
        }
    };
    req.send();
}

document.getElementById("1").addEventListener("click", () => showQuizButton("1"));
document.getElementById("2").addEventListener("click", () => showQuizButton("2"));
document.getElementById("3").addEventListener("click", () => showQuizButton("3"));
document.getElementById("4").addEventListener("click", () => showQuizButton("4"));

window.addEventListener("load", () => {
    var req = new XMLHttpRequest();
    req.open("GET", "/checksessionprogress");
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            var json = JSON.parse(req.responseText);
            if (json.available) {
                //do smth with json.currentQuizId
                var topicId = json.currentQuizId.toString()[0];
                showQuizButton(topicId);
            }
        }
    };
    req.send();
});


function test(que_id, quiz_id, user_answer) {
    var req = new XMLHttpRequest();

    req.open("GET", "/checkAnswers/" + user_answer + "/" + quiz_id + "/" + que_id + "/", true);
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            var response = JSON.parse(req.responseText);

            if (response[0]) {
                // display congrats text
                alert("Correct");

                // display next question & increment the question counter

            }
            else {
                var correctAns = response[1];
                var relevantLink = response[2];
                alert(correctAns,relevantLink);

                // display sorry, that's incorrect text

                //display correct answer

                //display link to relevant page
            }
        }
      
    }
    req.send();
}
