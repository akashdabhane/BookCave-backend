const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userdb',
        required: [true, "userId is required"]
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orderdb',
        required: [true, "orderId is required"]
    },
    paymentMethod: {
        type: String,
        enum: ["credit_card", "debit_card", "paypal", "cash_on_delivery"],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "completed", "failed", "refunded"],
        default: "pending"
    },
    amount: {
        type: Number,
        required: [true, "amount is required"]
    },
    transactionId: {
        type: String,
        // required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const paymentdb = mongoose.model("paymentdb", paymentSchema);

module.exports = paymentdb;
