const express = require('express');
require('express-async-errors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

//Database connection
require('./mongo');

//Models
require('./model/Post');
require('./model/Comment');

//Middleware
app.use(bodyParser.json())
    .use(morgan())

//Routes
app.use('/posts', require('./routes/posts'));

//While routes goes to wrong
app.use((req, res, next) => {
    req.status = 404;
    const error = new Error('Routes not found!');
    next(error);
});

//Error handler
if(app.get('env') === 'production'){
    app.use((error, req, res, next) => {
        res.status(req.status || 500).send({
            message: error.message
        });
    });
}

app.use((error, req, res, next) => {
    res.status(req.status || 500).send({
        message: error.message,
        stack: error.stack
    });
});

//Server
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});