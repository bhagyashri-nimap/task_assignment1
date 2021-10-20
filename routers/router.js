
var express = require('express');
var router = express.Router()
var UserService = require('../controllers/UserController')
var AgentService = require('../controllers/AgentController')
var PolicyCarrierService = require('../controllers/PolicyCarrierController')
var PolicyCategoryService = require('../controllers/PolicyCategoryController')
var PolicyInfoService = require('../controllers/PolicyInfoController')
var UserAccountService = require('../controllers/UserAccountController')
var MessageService = require('../controllers/MessageController')
router.all("/:apiName",(req, res,next) => {
    console.log("Called: ", req.path)
      next()
   
})
router.use(MessageService)
router.use(UserService)
router.use(AgentService)
router.use(PolicyCarrierService)
router.use(PolicyCategoryService)
router.use(PolicyInfoService)
router.use(UserAccountService)
module.exports = router