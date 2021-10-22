
var { userAccountData } = require('../mongooseModel/UserAccount.js');
const {Worker} = require('worker_threads');
exports.save = async function (data) {
    let saveUserAccount
       let newObj = {
        accountName: data.accountName,  
       }

       let userAccountObj = new userAccountData(newObj)
       saveUserAccount = await userAccountObj.save()
       if (saveUserAccount && !saveUserAccount._id) {
           return {
               data: "Something Went Wrong While Saving UserAccount",
               value: false
           }
       }
       return {
           data: "saved",
           value: true
       }
},
exports.uploadFile=async function(req){
    console.log(__dirname+'./UserModel.js')
    const worker = new Worker(__dirname +'/UserModel.js');
    worker.once('message', (val) => {
        console.log("val",val);
      });
      worker.postMessage('Hello, world!');
}