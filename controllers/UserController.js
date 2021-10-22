var express = require('express');
var router = express.Router()
var UserModel = require('../models/UserModel')
const multer = require('multer');
const XLSX = require('xlsx');
// var {authenticateUser} = require("../config/middleware");
router.use(express.json());
//sign up
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

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        const extArray = file.originalname.split('.');
        const extension = extArray[extArray.length - 1];
        cb(null, `${Date.now()}.${extension}`);
    },
    destination: 'public/uploads/',
});
const uploads = multer({ storage }).single('file');
//fileUpload api store data in mongodb
router.post("/fileUpload", async (req, res) => {
    console.log(req)
    uploads(req, res, async (err) => {
        if (err) {
            res.status(500).send(err)
        }
        var workbook = XLSX.readFile(req.file.path);
        var sheet_name_list = workbook.SheetNames;
        XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]).map(async(data)=>{
            console.log("data",data)
            var userdata={}
            userdata.firstName=data.firstname
            userdata.mobile=data.phone
            userdata.email=data.email
            userdata.dob=data.dob
            userdata.state=data.state
            userdata.zipCode=data.zip
            userdata.userType=data.userType
            userdata.gender=data.gender
             var saveUser = await UserModel.userSave(userdata)
             var companyData={}
             companyData.companyName=data.company_name
             var saveCompany = await UserModel.companySave(companyData)
             var categoryData={}
             categoryData.categoryName=data.category_name
             var savecategory = await UserModel.categorySave(categoryData)
             var policy={}
              policy.policyNumber=data.policy_number
              policy.startDate=data.policy_start_date
              policy.EndDate=data.policy_start_date
              policy.company=saveCompany._id
              policy.category=savecategory._id
              policy.user=saveUser._id
              var savepolicy = await UserModel.policySave(policy)
              var agent={}
              agent.agentName=data.agent
              var saveAgent = await UserModel.agentSave(agent)
              var userAccount={}
              userAccount.accountName=data.account_name
              var saveuserAccount = await UserModel.userAccountSave(userAccount)
        })
        return res.status(200).json("Done")
    })
    
})
//getpolicy for each user
router.get("/getPolicyForeachUser/:id", (req, res) => {
    UserModel.getPolicyForeachUser(req.params,res)
})
//Track real-time CPU utilization api
router.post("/cpuUsages", (req, res) => {
    UserModel.cpuUsages(req,res)
})
//search policy info using userName
router.post("/searchApi", async(req, res) => {
    try {
        var data = await UserModel.getPolicyInfo(req.query)
        if (data) {
            res.status(200).json(data)
        } else {
            res.status(500).json(data)
        }
    } catch (error) {
        res.status(500).send(error)
    }
})
module.exports = router