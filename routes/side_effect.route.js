const express = require('express');
const getConnection = require('../db');
const app = express.Router()
const connection = getConnection()


app.get('/', (req, res) => {
    connection.query('SELECT *, side_effect.side_effect_id as id FROM side_effect', (err, rows, fields) => {
        console.log('Thanh cong')
        res.json(rows)
    })
})

app.get('/:id/side_effect', (req, res) => {
    const id = req.params['id']
    connection.query('SELECT id_side_effect FROM side_effect WHERE id_side_effect = ?',[id], (err, rows, fields) => {
        console.log('Thanh cong')
        res.json(rows)
    })
})

module.exports = app