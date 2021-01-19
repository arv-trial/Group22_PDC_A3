const express = require('express');
const getConnection = require('../db');
const app = express.Router()
const connection = getConnection()


app.get('/', (req, res) => {
    connection.query('SELECT * FROM clinical_trial', (err, rows, fields) => {
        console.log('Thanh cong')
        res.json(rows)
    })
})

app.get('/:id/clinical-trial', (req, res) => {
    const id = req.params['id']
    connection.query('SELECT * FROM patient, clinical_trial WHERE patient.insurance_id =  AND patient.insurance_id = clinical_trial.insurance_id', [id], (err, rows, fields) => {
        console.log('Thanh cong')
        res.json(rows)
    })
})

app.delete('/:id/clinical_trial', (req, res) => {
    const id = req.params['id']
    console.log('id', id)
    // const query = `DELETE FROM patient WHERE insurance_id =  ${id} `
    connection.query('DELETE FROM result WHERE id_clinical_trail = ?', [id], (err, rows, fields) => {
        console.log('rows', rows)
        if (!err) {
            connection.query('DELETE FROM clinical_trial WHERE id_clinical_trail = ?', [id], (err, rows, fields) => {
                console.log('Success')
                res.json(rows)
            })
        }
        res.status(400).jsend(err)

    })
})

// Update
app.put('/:id', (req, res) => {
    const id = req.params['id']
    console.log('id', id)
    const body = req.body;
    console.log('body', body)

    connection.query('UPDATE clinical_trial SET ? WHERE id_clinical_trial = ?', [body, id], (err, rows, fields) => {
        if (!err)
            return res.status(200).json(rows)

        return res.status(400).send(err)

    })
    // console.log("Trying to create a new user...")
    // console.log("How do u get the data?")
    // res.end()
})

module.exports = app