const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var collectionSchema = Schema({
    message: {
        type: String
    }
});
var collectionData = mongoose.model('Collection2', collectionSchema);
module.exports = {
    collectionData
}