const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "name is required!"],
        minlength: 3
    },
    phone: {
        type: Number,
        required: [true, "phone no. is required!"],
        length: 10,
    },
    email: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: [true, "email body is required!"]
    }
})

const emaildb = mongoose.model('emaildb', emailSchema);

module.exports = emaildb; 
