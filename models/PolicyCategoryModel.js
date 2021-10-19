
var { policyCategoryData } = require('../mongooseModel/PolicyCategory.js');
exports.save = async function (data) {
    let savePolicyCategory
       let newObj = {
        categoryName: data.categoryName
       }

       let dateObj = new policyCategoryData(newObj)
       savePolicyCategory = await dateObj.save()
       if (savePolicyCategory && !savePolicyCategory._id) {
           return {
               data: "Something Went Wrong While Saving PolicyCategory",
               value: false
           }
       }
       return {
           data: "saved",
           value: true
       }
}