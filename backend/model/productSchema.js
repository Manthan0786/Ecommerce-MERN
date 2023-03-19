const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema(
    {
        "id": {type: Number},
        "title": {type: String, required: true},
        "description": {type: String},
        "price": {type: Number, min:[0,'Wrong Price'], required: true},
        "discountPercentage":  {type: Number,max:[90, 'Max Discount']},
        "rating": {type: Number, min: 1,max: 5},
        "stock": {type: Number},
        "brand": {type: String, required: true},
        "category": {type: String, required: true},
        "thumbnail": {type: String},
    }  
)

exports.Product = mongoose.model('Product', productSchema)