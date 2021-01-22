const express = require('express');
const getConnection = require('../db');
const app = express.Router()
const connection = getConnection()


app.get('/', (req, res) => {
    connection.query('SELECT *, drug.drug_name as id FROM drug', (err, rows, fields) => {
        console.log('Thanh cong')
        console.log(res)
        res.header("Access-Control-Expose-Headers", "Content-Range");
        res.header("Content-Range", "bytes : 0-9/*");
        res.json(rows)
    })
})

app.get('/', (req, res) => {
    connection.query('SELECT *, drug.drug_name as id FROM drug', (err, rows, fields) => {
        console.log('Thanh cong')
        console.log(res)
        res.header("Access-Control-Expose-Headers", "Content-Range");
        res.header("Content-Range", "bytes : 0-9/*");
        res.json(rows)
    })
})
// app.get('/', (req, res) => {
//     connection.query('SELECT drug_name,description FROM drug LEFT JOIN symtom USING(drug_name)', (err, rows, fields) => {
//         console.log('Thanh cong')
//         res.json(rows)
//     })
// })

app.get('/symtom', (req, res) => {   
    connection.query(`SELECT DISTINCT clinical_trial.drug_name, result.id_side_effect, side_effect.symtom
    FROM ((clinical_trial
    INNER JOIN result ON clinical_trial.id_clinical_trial = result.id_clinical_trail)
    INNER JOIN side_effect ON result.id_side_effect = side_effect.id_side_effect)`, (err, rows, fields) => {
        if (!err)
            return res.status(200).json(rows)

        return res.status(400).send(err)

    })
})

module.exports = app