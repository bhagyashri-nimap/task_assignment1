var express = require('express');
var router = express.Router()
var UserModel = require('../models/UserModel')
var {authenticateUser} = require("../config/middleware");
router.use(express.json());
router.post("/signup", async (req, res) => {
    try {
        var data = await UserModel.signUp(req.body)
        if (data.value) {
            res.status(200).json(data.data)
        } else {
            res.status(500).json(data)
        }
    } catch (error) {
        res.status(500).send(error)
    }
}),
//Login
router.post("/login", async (req, res) => {
    try {
        let outputData = await UserModel.login(req.body)
        if (outputData && outputData.value) {
            res.status(200).json(outputData.data)
        } else {
            res.status(500).json(outputData)
        }
    } catch (error) {
        console.log("inside err", error)
        res.status(500).send(error)
    }
})
module.exports = router