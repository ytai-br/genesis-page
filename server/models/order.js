const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    products: {
        type: [Number],
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    userId: {
        type: Number,
        required: true
    }
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;