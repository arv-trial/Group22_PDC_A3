const express = require('express');
const drugModel = require('./../models/drug.model');

const route = express.Router()


route.get('/', async (req, res) => {
    console.log('req :>> ', req);
    // const ret = await drugModel.getAll()
    res.status(200).json(ret)
})

route.post('/', async (req, res) => {
    console.log('req.body', req.body)
    await drugModel.add(req.body)
    res.status(201).json(res.json)
})

module.exports = route
