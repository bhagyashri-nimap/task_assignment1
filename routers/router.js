
var express = require('express');
var router = express.Router()
var UserService = require('../controllers/UserController')

router.all("/:apiName",(req, res,next) => {
    console.log("Called: ", req.path)
      next()
   
})
router.use(UserService)


module.exports = router