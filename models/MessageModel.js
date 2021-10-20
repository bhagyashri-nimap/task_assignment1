
var { messageData } = require('../mongooseModel/Message.js');
var cron = require("node-cron");
exports.save = async function (data) {
    var date = new Date(data.day);
    var unixTimeStamp = Math.floor(date.getTime() / 1000);
    var date1= new Date(unixTimeStamp*1000);
    var finaldate = date1.toLocaleDateString("en-US")
    var msgTime= new Date(finaldate+" "+data.time)
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
        }
        return {
            data: "saved",
            value: true
        }
    

}