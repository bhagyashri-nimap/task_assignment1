const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.ObjectId;
var userAccountSchema = Schema({
    accountName: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{
    timestamps: true
});
var userAccountData = mongoose.model('UserAccount', userAccountSchema);
module.exports = {
    userAccountData
}