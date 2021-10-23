const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var collectionSchema = Schema({
    message: {
        type: String
    }
},{
    timestamps: true
});
var collectionData = mongoose.model('Collection2', collectionSchema);
module.exports = {
    collectionData
}