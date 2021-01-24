const express = require('express');
const getConnection = require('../db');
const app = express.Router()
const connection = getConnection()


app.get('/', (req, res, next) => {
    connection.query('SELECT *, side_effect.side_effect_id as id FROM side_effect', (err, rows, fields) => {
        if (err)
            next(err)

        console.log('Thanh cong')
        // res.header("Access-Control-Expose-Headers", "Content-Range");
        // res.header("Content-Range", "bytes : 0-9/*");
        res.json(rows)
    })
})

app.get('/:id/side_effect', (req, res, next) => {
    if (err)
        next(err)
    const id = req.params['id']
    connection.query('SELECT id_side_effect FROM side_effect WHERE id_side_effect = ?', [id], (err, rows, fields) => {
        console.log('Thanh cong')
        // res.header("Access-Control-Expose-Headers", "Content-Range");
        // res.header("Content-Range", "bytes : 0-9/*");
        res.json(rows)
    })
})

module.exports = app