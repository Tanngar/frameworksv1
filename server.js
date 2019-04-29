const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

    // intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        // respond with 200
        console.log("Allowing OPTIONS");
        res.send(200);
    }
    else {
        // move on
        next();
    }
});

/*** Database ***/
mongoose.connect('mongodb://127.0.0.1:27017/mandatory_db', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
    console.log("MongoDB connected")
});
let answers = require('./answer.model');
let questions = require('./question.model');

/*** API ***/
app.listen(PORT, function () {
    console.log("Server is running on port: "+PORT);
});

/*** Routes ***/
let questionsRoute = require('./questions_router');
app.use('/questions', questionsRoute);

let answersRoute = require('./answers_router');
app.use('/answers', answersRoute);

/*** Error handling ***/
app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send({msg: 'Something broke! ' + err})
});