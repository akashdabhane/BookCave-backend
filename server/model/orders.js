const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }, // this is the User model that created the Order
    productId: {
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        // required: true
    },
    totalPrice: {
        type: Number,
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed'],
        default: 'pending'
    }

})

module.exports = mongoose.model('orderdb', orderSchema); 
