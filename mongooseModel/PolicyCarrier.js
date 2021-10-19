const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var policyCarrierSchema = Schema({
    companyName: {
        type: String
    }
},{
    timestamps: true
});
var policyCarrierData = mongoose.model('PolicyCarrier', policyCarrierSchema);
module.exports = {
    policyCarrierData
}