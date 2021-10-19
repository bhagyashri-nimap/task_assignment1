
var { policyInfoData } = require('../mongooseModel/PolicyInfo.js');
exports.save = async function (data) {
    let savePolicyInfoData
       let newObj = {
        policyNumber: data.policyNumber,
        startDate: data.startDate,
        EndDate:data.EndDate,
        company:data.company,
        category:data.category,
        user:data.user
       }

       let policyInfoObj = new policyInfoData(newObj)
       savePolicyInfoData = await policyInfoObj.save()
       if (savePolicyInfoData && !savePolicyInfoData._id) {
           return {
               data: "Something Went Wrong While Saving PolicyInfo",
               value: false
           }
       }
       return {
           data: "saved",
           value: true
       }
}