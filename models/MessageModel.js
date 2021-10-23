
var { messageData } = require('../mongooseModel/Message.js');
var { collectionData } = require('../mongooseModel/Collection2.js');
var moment=require('moment');
 
exports.save = async function (data) {
    var startDate = new Date();
    var endDate = data.day+"T"+data.time
    var formateDate = moment(endDate).utcOffset('+05:30').format('YYYY-MM-DD HH:mm:ss');
    var seconds = (new Date(formateDate).getTime() - startDate.getTime());
     if(startDate>new Date(formateDate)){
        return{
            data:"invalid date",
            value:true} 
        }
    var savemessage
       let newObj2 = {
        message: data.message,
        msgTimestamps:new Date(formateDate)
       }
        let msgObj = new messageData(newObj2)
         savemessage = await msgObj.save()
        if (savemessage && !savemessage._id) {
            return {
                data: "Something Went Wrong While Saving Message",
                value: false
            }
        }else{
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