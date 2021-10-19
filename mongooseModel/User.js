const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.ObjectId;
var userSchema = Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    mobile: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    dob: {
        type: Date
    },
    state: {
        type: String
    },
    zipCode: {
        type: Number
    },
    gender:{
        type: String,
        enum: ["M", "F"]
    },
    password: {
        type: String
    },
    accessToken:{
        type: String
    },
    userType:{
        type: String,
        enum: ["user","admin"],
        default: "user"
    }
    // category: {
    //     type: Schema.Types.ObjectId,
    //     ref: "category",
    //     required: true
    // },
});
var userData = mongoose.model('User', userSchema);
module.exports = {
    userData
}