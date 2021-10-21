
const mongoose = require('mongoose'),ObjectId=mongoose.ObjectId;
var { userData } = require('../mongooseModel/User.js');
var { policyCategoryData } = require('../mongooseModel/PolicyCategory.js');
var { policyInfoData } = require('../mongooseModel/PolicyInfo.js');
var { agentData } = require('../mongooseModel/Agent.js');
var { policyCarrierData } = require('../mongooseModel/PolicyCarrier.js');
var { userAccountData } = require('../mongooseModel/UserAccount.js');
var os = require('os-utils');
require('dotenv').config();
var _ = require('lodash');
var jwt = require("jsonwebtoken")
var jwtDecode = require("jwt-decode")
var sha256 = require("js-sha256").sha256
var jwtKey = process.env.JWT_KEY

exports.cpuUsages =  function (data,res) {
    os.cpuUsage(function(v){
        console.log( 'CPU Usage (%): ' + v );
        if(v>=70){
            process.on("exit", function () {
                require("child_process").spawn(process.argv.shift(), process.argv, {
                    cwd: process.cwd(),
                    detached : true,
                    stdio: "inherit"
                });
            });
            process.exit();
        }
    });
},
exports.getPolicyInfo = async function (data) {
    var searchMatch = {}
    if (data.search) {
    searchMatch = {firstName: {$regex: data.search }}
    }
    var userResData = await userData.find(searchMatch)
    var policy
     userResData.map((singledata)=>{
      policy =  policyInfoData.find({ user: mongoose.Types.ObjectId(singledata._id)}).populate("user")
    })
    return policy
    },
    
exports.getPolicyForeachUser = function (data, res) {
    console.log(data,"data")
    policyInfoData.aggregate([
        {
            $facet: {
                result: [
                    {
                        $match: {
                            user: mongoose.Types.ObjectId(data.id)
                        }
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "user",
                            foreignField: "_id",
                            as: "user"
                        }
                    },
                    {
                        $lookup: {
                            from: "policycategories",
                            localField: "category",
                            foreignField: "_id",
                            as: "category"
                        }
                    },
                    {
                        $lookup: {
                            from: "policycarriers",
                            localField: "company",
                            foreignField: "_id",
                            as: "company"
                        }
                    },

                ],
                count: [
                    {
                        $match: {
                            user: mongoose.Types.ObjectId(data.id)
                        }
                    },
                    {
                        $count: "count"
                    }
                ]
            }
        }
    ], (err, policy) => {
        if (!err) {
            if (policy &&
                !_.isEmpty(policy) &&
                policy[0].result.length > 0) {
                res.status(200).send(
                    {
                        result: policy[0].result,
                        count: policy[0].count[0].count
                    })
            }
        } else {
            res.status(500).send(err)
        }
    })
   
},
exports.userSave = async function (userdata) {
    const  ifAlreadyUser=await userData.findOne({
        email:userdata.email
      })

      if (ifAlreadyUser && ifAlreadyUser._id && ifAlreadyUser.email) {
        return {
            data: "Email Already Exist",
            value: false
        }
    }else{
        let userObj = new userData(userdata)
        var saveUser = await userObj.save()
        
             if (saveUser && !saveUser._id) {
                 return {
                     data: "Something Went Wrong While Saving UserAccount"
                 }
             }
             return saveUser
    }

    
},
exports.policySave = async function (policy) {
    const  ifAlreadypolicyNumber=await policyInfoData.findOne({
        policyNumber:policy.policyNumber
      })

      if (ifAlreadypolicyNumber && ifAlreadypolicyNumber._id && ifAlreadypolicyNumber.policyNumber) {
        return {
            data: "policy Already Exist",
            value: false
        }
    }else{
        let policyObj = new policyInfoData(policy)
        var savepolicy = await policyObj.save()
        
             if (savepolicy && !savepolicy._id) {
                 return {
                     data: "Something Went Wrong While Saving Policy"
                 }
             }
             return savepolicy
    }

    
},
exports.companySave = async function (companyData) {
    const  ifAlreadycompanyName=await policyCarrierData.findOne({
        companyName:companyData.companyName
      })

      if (ifAlreadycompanyName && ifAlreadycompanyName._id && ifAlreadycompanyName.companyName) {
        return {
            data: "companyName Already Exist",
        }
    }
  let companyObj = new policyCarrierData(companyData)
  var savecompany = await companyObj.save()
  
       if (savecompany && !savecompany._id) {
           return {
               data: "Something Went Wrong While Saving Company"
           }
       }
       return savecompany
},
exports.categorySave = async function (categoryData) {
    const  ifAlreadycategoryName=await policyCategoryData.findOne({
        categoryName:categoryData.categoryName
      })

      if (ifAlreadycategoryName && ifAlreadycategoryName._id && ifAlreadycategoryName.categoryName) {
        return {
            data: "categoryName Already Exist",
        }
    }
  let categoryObj = new policyCategoryData(categoryData)
  var savecategory = await categoryObj.save()
  
       if (savecategory && !savecategory._id) {
           return {
               data: "Something Went Wrong While Saving Category"
           }
       }
       return savecategory
}
exports.agentSave = async function (agent) {
    const  ifAlreadyagentName=await agentData.findOne({
        agentName:agent.agentName
      })

      if (ifAlreadyagentName && ifAlreadyagentName._id && ifAlreadyagentName.agentName) {
        return {
            data: "AgentName Already Exist",
        }
    }
  let agentObj = new agentData(agent)
  var saveagent = await agentObj.save()
  
       if (saveagent && !saveagent._id) {
           return {
               data: "Something Went Wrong While Saving Agent"
           }
       }
       return saveagent
}
exports.userAccountSave = async function (userAccount) {
    const  ifAlreadyuserAccount=await userAccountData.findOne({
        accountName:userAccount.accountName
      })

      if (ifAlreadyuserAccount && ifAlreadyuserAccount._id && ifAlreadyuserAccount.accountName) {
        return {
            data: "UserAccount Already Exist",
        }
    }
  let userAccountObj = new userAccountData(userAccount)
  var saveuserAccount = await userAccountObj.save()
  
       if (saveuserAccount && !saveuserAccount._id) {
           return {
               data: "Something Went Wrong While Saving UserAccount"
           }
       }
       return saveuserAccount
}
exports.signUp = async function (data) {
    let saveUser
       const ifAlreadyUser = await userData.findOne({
           email: _.toLower(data.email)
       })

       if (ifAlreadyUser && ifAlreadyUser._id && ifAlreadyUser.email) {
           return {
               data: "Email Already Exist",
               value: false
           }
       }
       const ifAlreadyUserMobile = await userData.findOne({
           mobile: data.mobile
       })

       if (
           ifAlreadyUserMobile &&
           ifAlreadyUserMobile._id &&
           ifAlreadyUserMobile.mobile
       ) {
           return {
               data: "User Mobile No Already Exist",
               value: false
           }
       }
       let newUserObj = {
           firstName: data.firstName,
           dob:data.dob,
           state:data.state,
           gender:data.gender,
           email: _.toLower(data.email),
           mobile: data.mobile,
           password: sha256(data.password)
       }

       let userObj = new userData(newUserObj)
       saveUser = await userObj.save()
       let accessTokenOutput = generateAccessToken(
           saveUser
       )
       if (accessTokenOutput && !accessTokenOutput.value) {
           return {
               data: "Failed to Generate AccessToken",
               value: false
           }
       }else{
           let newObj = {
               accessToken: accessTokenOutput.data.accessToken,   
           }
           const userOutput = await userData.findByIdAndUpdate({
               _id: saveUser._id
           },
           {$set: newObj}, {new: true}
       )
       saveUser = await userOutput.save()    
       }
       if (saveUser && !saveUser._id) {
           return {
               data: "Something Went Wrong While Saving User",
               value: false
           }
       }
       return {
           data: accessTokenOutput.data,
           value: true
       }
},

exports.login = async function (data) {
   data.email = _.toLower(data.email)
       const checkUser = await userData.findOne({
           email: data.email
       })

       if (_.isEmpty(checkUser)) {
           return {
               data: "Incorrect Username or Password.",
               value: false
           }
       }
       let encryptedPassword = sha256(data.password)
       if (
           checkUser &&
           checkUser.password &&
           checkUser.password != encryptedPassword
       ) {
           return {
               data: "Incorrect Username or Password",
               value: false
           }
       }
       let accessTokenOutput = generateAccessToken(
           checkUser
       )
       if (accessTokenOutput && !accessTokenOutput.value) {
           return {
               data: "Failed to Generate AccessToken",
               value: false
           }
       }else{
           let newObj = {
               accessToken: accessTokenOutput.data.accessToken,   
           }
           const userOutput = await userData.updateOne({
               _id: checkUser._id
           },
           newObj   
       )
       if (userOutput && userOutput.nModified) {
           return {
               data: "Update Successfully",
               value: true
           }
       }  
       }
        return accessTokenOutput
},
generateAccessToken=function(userAvailable) {
    let objToGenerateAccessToken = {
        _id: userAvailable._id,
        name: userAvailable.name,
        email: userAvailable.email,
        mobile: userAvailable.mobile
    }
    var token = jwt.sign(objToGenerateAccessToken, jwtKey)
    objToGenerateAccessToken.accessToken = token
    delete objToGenerateAccessToken._id
    return {
        data: objToGenerateAccessToken,
        value: true
    }
}

