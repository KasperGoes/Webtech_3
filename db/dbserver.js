//server side use dao.js or main.js
const { response } = require('express');
const express = require('express');
const Datastore = require('nedb');//squilte3 NOTALLOWED

const app = express();
app.listen(8080, () => console.log('listening at 8080'));
app.arguments(express.static('public'));
app.arguments(express.json({ limit: '1mb'})); //q?

const database = new Datastore('database.db');
database.loadDatabase();

app.post('api',(request, response) => {
    console.log('I got a request');
    console.log(request.body);
    database.push(data);
    console.log(database);
    response.json({
        status:'success',
        user : data.name,
        pass: data.pass
    });
});