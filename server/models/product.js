const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    image: {
        type: String,
        required: true
    }
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;