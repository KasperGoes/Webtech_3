const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require('path');

const app = express();
app.listen(8044); // 1: this is currently set on 8080, so you can see it on your localhost

//app.use(express.static(path.join(__dirname, "/stuff"))) // 2: method of making sure your file paths work, regardless of if you're working on localhost or the uni server
app.use(express.static("views"));
/* 3: this says how the server should react when receiving a GET request from source "/" 
this specific source indicates when someone first goes to a website, requesting the starting page of the website*/
app.get("/", (req, res) => {
    //res.sendFile(path.join(__dirname, 'stuff/index.html'));
    res.send([1,2,3 ,'Sanaz here']); //q?
});
//serverSide

//var formSubmission = document.forms.submissionForm;
//var formData = new FormData(formSubmission);
//var username = formData.get('username');
//var formData = new formData(document.querySelector('submissionForm'));
//console.log(formData);