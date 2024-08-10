const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    author: {
        type: String,
        default: 'unknown',
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
    },
    availablePieces: {
        type: Number,
        required: true,
    }, 
    bookCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categorydb',
        required: true,
    }
    // publicationName: {
    //     type: String,
    //     required: true
    // },
    // publisheredBy: {
    //     type: mongoose.Types.ObjectId,
    //     required: true
    // },
});

const bookdb = mongoose.model('bookdb', bookSchema);

module.exports = bookdb;