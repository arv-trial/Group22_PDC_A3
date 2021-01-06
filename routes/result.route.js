const express = require('express');
const getConnection = require('../db');
const app = express.Router()
const connection = getConnection()


app.get('/', (req, res) => {
    connection.query('SELECT * FROM result', (err, rows, fields) => {
        console.log('Thanh cong')
        res.json(rows)
    })
})

module.exports = app