const express = require('express');
const getConnection = require('../db');
const app = express.Router()
const connection = getConnection()


app.get('/', (req, res, next) => {
    connection.query('SELECT * FROM result', (err, rows, fields) => {
        if (err)
        next(err)
        console.log('Thanh cong')
        res.header("Access-Control-Expose-Headers", "Content-Range");
        res.header("Content-Range", "bytes : 0-15/*");
        res.json(rows)
    })
})


module.exports = app