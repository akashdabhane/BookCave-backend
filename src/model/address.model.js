const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userdb',
        required: true
    },
    addressType: {
        type: String,
        enum: ['home', 'work', 'other'],
        default: 'home'
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    },
    isDefault: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

const addressdb = mongoose.model('addressdb', addressSchema);

module.exports = addressdb;
