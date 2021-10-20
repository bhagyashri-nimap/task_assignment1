const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var messageSchema = Schema({
    message: {
        type: String
    },
    msgTimestamps:{
        type: Date 
    }
});
var messageData = mongoose.model('Message', messageSchema);
module.exports = {
    messageData
}