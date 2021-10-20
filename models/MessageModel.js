
var { messageData } = require('../mongooseModel/Message.js');
exports.save = async function (data) {
    console.log(data,"data")
    var savemessage
       let newObj2 = {
        message: data.message,
        day: data.day,
        time:data.time
       }
    const ifAlreadyday = await messageData.findOne({
        day:data.day
    })
    if (ifAlreadyday && ifAlreadyday._id && ifAlreadyday.day) {
        console.log(ifAlreadyday)
        let newObj = {
            message: data.message,   
        }
        const userOutput = await messageData.findByIdAndUpdate({
            _id: ifAlreadyday._id
        },
        {$set: newObj}, {new: true}
    )
       var savemsg = await userOutput.save()
       if (savemsg && !savemsg._id) {
        return {
            data: "Something Went Wrong While Saving Msg",
            value: false
        }
    }
    return {
        data: "updated",
        value: true
    }    
    }else{
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



    //    let msgObj = new messageData(newObj2)
    //    savemessage = await msgObj.save()
    //    if (savemessage && !savemessage._id) {
    //        return {
    //            data: "Something Went Wrong While Saving Message",
    //            value: false
    //        }
    //    }
    //    return {
    //        data: "saved",
    //        value: true
    //    }
}