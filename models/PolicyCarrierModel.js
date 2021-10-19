
var { policyCarrierData } = require('../mongooseModel/PolicyCarrier.js');
exports.save = async function (data) {
    let savepolicyCarrier
       let newObj = {
        companyName: data.companyName
       }

       let dateObj = new policyCarrierData(newObj)
       savepolicyCarrier = await dateObj.save()
       if (savepolicyCarrier && !savepolicyCarrier._id) {
           return {
               data: "Something Went Wrong While Saving PolicyCarrier",
               value: false
           }
       }
       return {
           data: "saved",
           value: true
       }
}