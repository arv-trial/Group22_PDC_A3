var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const drugRoute = require('./routes/drug');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
    origin: '*'
}))


app.use('/drug', drugRoute)


module.exports = app;
