var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
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
    origin: '*',
    methods: 'GET,PUT,POST,DELETE,OPTIONS',
    optionsSuccessStatus: '200',
    // res.header("Access-Control-Expose-Headers", "Content-Range");
                // res.header("Content-Range", "bytes : 0-9/*");
}))

app.options('*', cors())

app.use('/patient', cors(), require('./routes/patient.route'))
app.use('/drug', cors(), require('./routes/drug.route'))
app.use('/company', cors(), require('./routes/company.route'))
app.use('/side_effect', cors(), require('./routes/side_effect.route'))
app.use('/clinical_trial', cors(), require('./routes/clinical_trial.route'))
app.use('/result', cors(), require('./routes/result.route'))

app.use(function (err, req, res, next) {
    const code = err.code || 500;
    console.log(code, err.message);
    res.status(code).send(err.message);
});


app.use(logger('combined'))

module.exports = app;