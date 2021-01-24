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
    origin: '*'
}))

app.use('/patient', require('./routes/patient.route'))
app.use('/drug', require('./routes/drug.route'))
app.use('/company', require('./routes/company.route'))
app.use('/side_effect', require('./routes/side_effect.route'))
app.use('/clinical_trial', require('./routes/clinical_trial.route'))
app.use('/result', require('./routes/result.route'))



app.use((req, res, next) => {
    res.status(404).send("NOT FOUND");
  });
  
  app.use(function (err, req, res, next) {
    const code = err.code || 500;
    console.log(code, err.message);
    res.status(code).send(err.message);
  });

app.use(logger('combined'))

module.exports = app;