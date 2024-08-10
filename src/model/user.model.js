const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        minlength: 3
    },
    lastName: {
        type: String,
        require: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
        length: [10, "Give valid phone number."]
    }, 
    wishlist: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'bookdb'
    }
}, { timestamps: true })

const userdb = mongoose.model('userdb', userSchema);

module.exports = userdb; 
