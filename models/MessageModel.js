
var { messageData } = require('../mongooseModel/Message.js');
var { collectionData } = require('../mongooseModel/Collection2.js');
var moment=require('moment');
 function timeStamps (data) {
     console.log("data")
    let saveMsg
    let newObj = {
     message: data
    }
    let Obj = new collectionData(newObj)
    saveMsg = Obj.save()
    // if (saveMsg && !saveMsg._id) {
    //     return {
    //         data: "Something Went Wrong While Saving data Message",
    //         value: false
    //     }
    // }
   
}
exports.save = async function (data) {
    var date = new Date(data.day);
    var unixTimeStamp = Math.floor(date.getTime() / 1000);
    var date1= new Date(unixTimeStamp*1000);
    var finaldate = date1.toLocaleDateString("en-US")
    var savemessage
       let newObj2 = {
        message: data.message,
        msgTimestamps:new Date(finaldate+" "+data.time)
       }
        let msgObj = new messageData(newObj2)
         savemessage = await msgObj.save()
        if (savemessage && !savemessage._id) {
            return {
                data: "Something Went Wrong While Saving Message",
                value: false
            }
        }else{
            var startDate = new Date();
            console.log(startDate,"startDate")
            var endDate = data.day+"T"+data.time
            var date = moment(endDate).utcOffset('+05:30').format('YYYY-MM-DD HH:mm:ss');
            var seconds = (new Date(date).getTime() - startDate.getTime());
            var intervel= setInterval(function timeStamps() {
                let newObj = {
                    message: data.message
                   }
                   let Obj = new collectionData(newObj)
                   saveMsg = Obj.save()
                   clearInterval(intervel);
            },seconds)
            return{
                data:"saved",
                value:true
            }
        }
}