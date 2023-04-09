const mongoose = require("mongoose");
const ProducFilterSchema = mongoose.Schema({
    product: { type: String, required: true },
    brands: { type: [String], required: true },
    
})
const ProducFiltertModel = mongoose.model("productfilter", ProducFilterSchema);

module.exports = {
    ProducFiltertModel
}