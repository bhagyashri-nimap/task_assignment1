const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.ObjectId;
var policyInfoSchema = Schema({
    policyNumber: {
        type: String
    },
    startDate: {
        type: Date
    },
    EndDate: {
        type: Date
    },
    company:{
        type: Schema.Types.ObjectId,
        ref: "policyCarrier",
       
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: "PolicyCategory",
       
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
        
    },
},{
    timestamps: true
});
var policyInfoData = mongoose.model('PolicyInfo', policyInfoSchema);
module.exports = {
    policyInfoData
}