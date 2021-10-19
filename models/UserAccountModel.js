
var { userAccountData } = require('../mongooseModel/UserAccount.js');
exports.save = async function (data) {
    let saveUserAccount
       let newObj = {
        accountName: data.accountName,
        user: data.user
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
}