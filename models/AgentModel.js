
var { agentData } = require('../mongooseModel/Agent.js');
exports.save = async function (data) {
    let saveAgent
       let newAgentObj = {
        agentName: data.agentName,
        user: data.user
       }

       let agentObj = new agentData(newAgentObj)
       saveAgent = await agentObj.save()
       if (saveAgent && !saveAgent._id) {
           return {
               data: "Something Went Wrong While Saving Agent",
               value: false
           }
       }
       return {
           data: "saved",
           value: true
       }
}