const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
let shuffledQuestions, currentQuestionIndex;
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons'); 
startButton.addEventListener('click',startGame);
nextButton.addEventListener('click',() => {
    currentQuestionIndex++;
    setNextQuestion();
});

//Make question classes
class Questions {
    constructor(title, problemstatement, correctanswer){
    this.title = title;
    this.problemstatement = problemstatement;
    this.correctanswer = correctanswer;
    }
}

class Multiplechoice extends Questions {
    constructor(title, problemstatement, correctanswer){
        super(title, problemstatement, correctanswer);
        this.falseAnswer = [];
    }
    addAnswers(answerOne, answerTwo, answerThree, answerFour) {
        this.falseAnswer.push( 
            answerOne,
            answerTwo,
            answerThree,
            answerFour
        );
    }
}

// Create question objects
var questionOne = new Questions ('1', 'What is the most popular browser used today?', 'Google Chrome');
var questionTwo = new Multiplechoice ('2', 'Which browser is the fastest?', 'Google Chrome');
questionTwo.addAnswers('Internet Explorer','Safari','Google Chrome','Firefox');
var questionThree = new Questions('3', 'When was the first web browser invented?', '1990');
var questionFour = new Multiplechoice ('4', 'What is a web browser?', 'Software application for accessing information on the World Wide Web');
questionFour.addAnswers('Web device','Hardware to access the internet','Software application for accessing information on the World Wide Web','None');
var questionFive = new Multiplechoice ('5', 'Who invented web browser?', 'Tim Berners');
questionFive.addAnswers('Mark Zuckerberg','Rob Kahn','Larry Page','Tim Berners');
const questionArray = [questionOne, questionTwo, questionThree, questionFour, questionFive];


// Code to run quiz
function startGame(){
    startButton.classList.add('hide');
    shuffledQuestions = questionArray.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0 ;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion(){
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question){
    questionElement.innerText = question.problemstatement;
    if (question instanceof Multiplechoice){
        question.falseAnswer.forEach(answer => {
        const button = document.createElement('button');
        var textButton = document.createTextNode (answer);
        button.appendChild(textButton)
        button.classList.add('btn');
        answerButtonsElement.appendChild(button);
        button.addEventListener('click', selectAnswer);
        if (answer == question.correctanswer){
            button.dataset.correct = answer.correct;

        }
    })
    }
    
    else{
        createtextbox = document.createElement("INPUT");
        createtextbox.setAttribute("type", "text");
        createtextbox.id = 'textbox1';
        answerButtonsElement.appendChild(createtextbox);
        textbox1.addEventListener('change', function() {
            textbox1.value = textbox1.value.toLowerCase();
            if(textbox1.value == question.correctanswer.toLowerCase()){
                textbox1.value = "CORRECT!";
                const button = document.createElement('button');
                button.classList.add('btn');
                answerButtonsElement.appendChild(button);
                var textButton = document.createTextNode ("press me");
                button.appendChild(textButton)
                button.addEventListener('click', selectAnswer);
            } else{ alert("Try " + question.correctanswer)}
        })
    }

}

function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}
function selectAnswer(e){
    const selectButton = e.target
    const correct = selectButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)

    })
    if (shuffledQuestions.length > currentQuestionIndex +1) {
    nextButton.classList.remove('hide')
    } else {
        var textButton = document.createTextNode ('Over');
        startButton.appendChild(textButton)
        startButton.classList.remove('hide')
    }
}
function setStatusClass(element,correct){
    clearStatusClass(element)
    if (correct){
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}
function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}