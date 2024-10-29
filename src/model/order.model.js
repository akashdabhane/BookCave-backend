const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userdb',
        required: [true, "userId is required"]
    }, // this is the User model that created the Order
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bookdb',
        required: [true, "bookId is required"]
    },
    quantity: {
        type: Number,
        required: [true, "quantity is required"]
    },
    totalAmount: {
        type: Number,
        required: [true, "totalAmount is required"]
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'cancelled'],
        default: 'pending'
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'addressdb',
        required: [true, "addressId is required"]
    }
}, { timestamps: true })

const orderdb = mongoose.model('orderdb', orderSchema);

module.exports = orderdb;
