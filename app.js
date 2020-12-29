var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const mysql = require('mysql');
// const drugRoute = require('./routes/drug');

const bodyParser = require('body-parser')
var app = express();

app.use(bodyParser.urlencoded({
    // extended: false
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(cors({
    origin: '*'
}))

const connection = getConnection()


// app.use('/drug', drugRoute)

app.use(logger('combined'))

app.post('/patient', (req, res) => {
    console.log("Trying to create a new user...")
    console.log('How do we get the data?')

    const patientName = req.body.patient_name
    const insurance_id = req.body.insurance_id

    console.log('req.body', req.body)

    const queryString = 'INSERT INTO `patient` VALUES (?)'
    connection.query(queryString, [Object.values(req.body)], (err, result, fields) => {
        if (err) {
            console.log('Failed to insert new user:' + err)
            res.sendStatus(500)
            return
        }

        // console.log('Insert a new user with id: ', result.insertedId);
        console.log('result', result)
        res.status(200).json(result)
        // res.end()
    })
})



app.get("/", (req, res) => {
    console.log("REsponding to root route")
    res.send("Hello from Rooot")
})

// app.get('/patient', (req, res) => {
//     var patients = [] // db ()

//     res.status(200).json(patients)
// })

function getConnection() {
    return mysql.createConnection({
        host: 'db4free.net',
        user: 'mooncactus',
        database: 'art_trial',
        password: '555555555'
    })
}

app.get('/patient/:id', (req, res) => {
    console.log('Fetching patient with id: ' + req.params.id)
    var id = req.params.id
    connection.query('SELECT * FROM patient WHERE insurance_id = ? ', [id], (err, rows, fields) => {
        console.log('Thanh cong')
        res.json(rows)
    })
})

app.delete('/patient/:id', (req, res)=>{
    const insurance_id = req.params['id']

    connection.query('DELETE FROM patient WHERE insurance_id = ?', [insurance_id], (err, rows, fields) => {
        console.log('Thanh cong')
        res.json(rows)
    })
})

module.exports = app;