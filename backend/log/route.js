const express = require('express')
const route = express.Router()
const {logModel}= require('./model')
route.get('/', async (req, res) => {
    try {
        const data = await logModel.find({})
        res.json({ success: true, data })
    }
    catch (err) {
        res.json({ success: false, err:err.message })
    }

})
module.exports = route