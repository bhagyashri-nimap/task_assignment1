const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var userSchema = Schema({
    firstName: {
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
        enum: ["Male", "Female"]
    },
    password: {
        type: String
    },
    accessToken:{
        type: String
    },
    userType:{
        type: String
    } 
},
{
    timestamps: true
});
var userData = mongoose.model('User', userSchema);
module.exports = {
    userData
}