const express = require('express');
const getConnection = require('../db');
const app = express.Router()
const connection = getConnection()


app.get('/:id', (req, res) => {
    console.log('Fetching patient with id: ' + req.params.id)
    var id = req.params.id
    connection.query('SELECT * FROM patient WHERE insurance_id = ? ', [id], (err, rows, fields) => {
        console.log('Sucess')
        res.json(rows)
    })
})

// app.delete('/:id', (req, res) => {
//     const insurance_id = req.params['id']

//     connection.query('DELETE FROM patient WHERE insurance_id = ?', [insurance_id], (err, rows, fields) => {
//         console.log('Success')
//         res.json(rows)
//     })
// })


app.post('/', (req, res) => {
    console.log("Trying to create a new user...")
    console.log('How do we get the data?')

    const patientName = req.body.patient_name
    const insurance_id = req.body.insurance_id


    console.log('req.body', req.body)

    const queryString = 'INSERT INTO `patient` VALUES (?)'
    connection.query(queryString, [Object.values(req.body)], (err, result, fields) => {
        if (err) {
            console.log('Failed to insert new user:' + err)
            res.sendStatus(500)
            return
        }

        // console.log('Insert a new user with id: ', result.insertedId);
        console.log('result', result)
        res.status(200).json(result)
        // res.end()
    })
})


app.get('/', (req, res) => {
    connection.query('SELECT * FROM patient', (err, rows, fields) => {
        console.log('Thanh cong')
        res.json(rows)
    })
})

app.delete('/:delete_id', (req, res) => {
    const id = req.params['delete_id']
    console.log('id', id)
    // const query = `DELETE FROM patient WHERE insurance_id =  ${id} `
    connection.query('DELETE FROM clinical_trial WHERE insurance_id =  ?', [id], (err, rows, fields) => {
        console.log('rows', rows)
        if (!err) {
            connection.query('DELETE FROM patient WHERE insurance_id =  ?', [id], (err, rows, fields) => {
                console.log('Success')
                res.json(rows)
            })
        }

    })
})




module.exports = app