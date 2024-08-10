const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        minlength: 3
    },
}, { timestamps: true });

const categorydb = mongoose.model('categorydb', categorySchema);

module.exports = categorydb;
