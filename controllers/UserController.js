var express = require('express');
var router = express.Router()
var UserModel = require('../models/UserModel')
const multer = require('multer');
const XLSX = require('xlsx');
var {authenticateUser} = require("../config/middleware");
var { userData } = require('../mongooseModel/User.js');
var { policyCategoryData } = require('../mongooseModel/PolicyCategory.js');
var { policyInfoData } = require('../mongooseModel/PolicyInfo.js');
var { agentData } = require('../mongooseModel/Agent.js');
var { policyCarrierData } = require('../mongooseModel/PolicyCarrier.js');
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
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        const extArray = file.originalname.split('.');
        const extension = extArray[extArray.length - 1];
        cb(null, `${Date.now()}.${extension}`);
    },
    destination: 'public/uploads/',
});
const uploads = multer({ storage }).single('file');
router.post("/fileUpload", async (req, res) => {
    console.log(req)
    uploads(req, res, async (err) => {
        // var saveUser
        if (err) {
            res.status(500).send(err)
        }
        console.log("req.file+++++++++++++++++=",req.file.path)
        var workbook = XLSX.readFile(req.file.path);
        var sheet_name_list = workbook.SheetNames;
        //   console.log("dddd",XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]))
        XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]).map(async(data)=>{
            console.log("data",data)
            var userdata={}
            userdata.firstname=data.firstname
            userdata.mobile=data.phone
            userdata.email=data.email
            userdata.dob=data.dob
            userdata.state=data.state
            userdata.zipCode=data.zip
            userdata.userType=data.userType
            userdata.gender=data.gender
          
            console.log(userdata,"userdata")
            // let userObj = new userData(userdata)
            // var saveUser = await userObj.save()
           var saveUser = await UserModel.userSave(userdata)
            console.log(saveUser,"saveUser+++++++++++++++++==")
             var companyData={}
             companyData.companyName=data.company_name
            //  let companyObj = new policyCarrierData(companyData)
            //  var saveCompany = await companyObj.save()
            var saveCompany = await UserModel.companySave(companyData)
             var categoryData={}
             categoryData.categoryName=data.category_name
            //  let categoryObj = new policyCategoryData(categoryData)
            //  var savecategory = await categoryObj.save()
             var savecategory = await UserModel.categorySave(categoryData)
             var policy={}
              policy.policyNumber=data.firstname
              policy.startDate=data.policy_start_date
              policy.EndDate=data.policy_start_date
              policy.company=saveCompany._id
              policy.category=savecategory._id
              policy.user=saveUser._id
            //   let policyObj = new policyInfoData(policy)
            //   savepolicy = await policyObj.save()
            var savepolicy = await UserModel.policySave(policy)
        })
        return res.status(200).json("Done")
    })
    
})
module.exports = router