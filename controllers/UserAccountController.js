var express = require('express');
var router = express.Router()
var UserAccountModel = require('../models/UserAccountModel')
var {authenticateUser} = require("../config/middleware");
router.use(express.json());
router.post("/saveUserAccount", async (req, res) => {
    try {
        var data = await UserAccountModel.save(req.body)
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