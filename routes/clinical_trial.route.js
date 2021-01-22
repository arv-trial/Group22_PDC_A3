const express = require('express');
const getConnection = require('../db');
const app = express.Router()
const connection = getConnection()


app.get('/', (req, res) => {
    connection.query('SELECT *, clinical_trial.id_clinical_trial as id FROM clinical_trial', (err, rows, fields) => {
        console.log('Thanh cong')

        res.header("Access-Control-Expose-Headers", "Content-Range");
        res.header("Content-Range", "bytes : 0-9/*");


        res.json(rows)
    })

})

app.get('/:id/clinical-trial', (req, res) => {
    const id = req.params['id']
    connection.query('SELECT * patient.insurance_id as id FROM patient, clinical_trial WHERE patient.insurance_id =  AND patient.insurance_id = clinical_trial.insurance_id', [id], (err, rows, fields) => {
        console.log('Thanh cong')

        res.header("Access-Control-Expose-Headers", "Content-Range");
        res.header("Content-Range", "bytes : 0-9/*");


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

app.get('/resistant', (req, res) => {
    connection.query(`SELECT id_clinical_trial, after_6_month, cd4_init_record, (after_6_month-cd4_init_record) as subtract FROM clinical_trial`, (err, rows, fields) => {
        if (!err) {
            console.log('rows', rows)
            let result = rows.reduce((accumulator, currentValue) => {
                if (currentValue.subtract < 50)
                    accumulator['resistantPatient'] += 1
                accumulator['nonResistantPatient'] += 1
                return accumulator
            }, {
                resistantPatient: 0,
                nonResistantPatient: 0
            })
            return res.status(200).json(result)
        }

        return res.status(400).send(err)


    })
})

module.exports = app