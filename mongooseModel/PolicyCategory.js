const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var policyCategorySchema = Schema({
    categoryName: {
        type: String
    }
},{
    timestamps: true
});
var policyCategoryData = mongoose.model('PolicyCategory', policyCategorySchema);
module.exports = {
    policyCategoryData
}