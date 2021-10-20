var express = require('express');
var router = express.Router()
var MessageModel = require('../models/MessageModel')
router.use(express.json());
router.post("/saveMsg", async (req, res) => {
    try {
        var data = await MessageModel.save(req.body)
        if (data.value) {
            res.status(200).json(data.data)
        } else {
            res.status(500).json(data)
        }
    } catch (error) {
        res.status(500).send(error)
    }
}),
module.exports = router