var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const mysql = require('mysql');
// const drugRoute = require('./routes/drug');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(cors({
    origin: '*'
}))


// app.use('/drug', drugRoute)




app.use(logger('combined'))

app.get("/", (req, res) => {
    console.log("REsponding to root route")
    res.send("Hello from Rooot")
})

app.get('/patient', (req, res) => {
    var patients = [] // db ()

    res.status(200).json(patients)
})

app.get('/patient/:id', (req, res) => {
    console.log('Fetching patient with id: ' + req.params.id)
    var id = req.params.id
    connection.query('SELECT * FROM patient WHERE insurance_id = ? ', [id], (err, rows, fields) => {
        console.log('Thanh cong')
        res.json(rows)
    })
})

const connection = mysql.createConnection({
    host: 'db4free.net',
    user: 'mooncactus',
    database: 'art_trial',
    password: '555555555'
})

module.exports = app;