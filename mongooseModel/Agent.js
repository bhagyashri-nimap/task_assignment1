const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.ObjectId;
var agentSchema = Schema({
    agentName: {
        type: String
    }
},{
    timestamps: true
});
var agentData = mongoose.model('Agent', agentSchema);
module.exports = {
    agentData
}