const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    publisher: {
        type: Boolean,
        default: false,
    },
    publicationName: {
        type: String,
        default: null
    }, 
    address: {
        street: {
            type: String,
            require: true
        },
        city: {
            type: String,
            require: true
        },
        pin: {
            type: Number,
            require: true
        },
        state: String,
    }, 
    createAt: {
        type: Date,
        default: Date.now
    }
})

const userdb = mongoose.model('userdb', userSchema);

module.exports = userdb; 
