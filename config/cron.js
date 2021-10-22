
var cron = require("node-cron");
var { collectionData } = require('../mongooseModel/Collection2.js');
exports.timeStamps=async function(day,time,msg){
var dayArry=day.split('-')
var timeArry=time.split(':')
console.log(dayArry)
console.log(timeArry)
cron.schedule(`${timeArry[1]} ${timeArry[0]} ${dayArry[2]} ${dayArry[1]} *`, () => {
console.log("111111111111111111")
let saveMsg
       let newObj = {
        message: msg,
       }

       let Obj = new collectionData(newObj)
       saveMsg = Obj.save()
       if (saveMsg && !saveMsg._id) {
           return {
               data: "Something Went Wrong While Saving data",
               value: false
           }
       }
       return {
           data: "saved",
           value: true
       }
  });
}
