const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.ObjectId;
var userAccountSchema = Schema({
    accountName: {
        type: String
    }
},{
    timestamps: true
});
var userAccountData = mongoose.model('UserAccount', userAccountSchema);
module.exports = {
    userAccountData
}