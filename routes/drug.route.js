const express = require('express');
const getConnection = require('../db');
const app = express.Router()
const connection = getConnection()


app.get('/', (req, res) => {
    connection.query('SELECT * FROM drug', (err, rows, fields) => {
        console.log('Thanh cong')
        res.json(rows)
    })
})

// app.get('/', (req, res) => {
//     connection.query('SELECT drug_name,description FROM drug LEFT JOIN symtom USING(drug_name)', (err, rows, fields) => {
//         console.log('Thanh cong')
//         res.json(rows)
//     })
// })


module.exports = app