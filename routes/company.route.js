const express = require('express');
const getConnection = require('../db');
const app = express.Router()
const connection = getConnection()


app.get('/', (req, res) => {
    connection.query('SELECT * FROM company', (err, rows, fields) => {
        console.log('Thanh cong')
        res.json(rows)

        res.header('Access-Control-Expose-Headers', 'Content-Range')
        res.header('Content-Range', 'bytes : 0-9/*')
    })
})

module.exports = app