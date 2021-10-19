const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.ObjectId;
var agentSchema = Schema({
    agentName: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
},{
    timestamps: true
});
var agentData = mongoose.model('Agent', agentSchema);
module.exports = {
    agentData
}