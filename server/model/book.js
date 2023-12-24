const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        public_id: {
            type: String,
            // required: true,
        }, 
        url: {
            type: String,
            // required: true,
        }
    },
    price: {
        type: Number,
        required: true,
    },
    publicationName: {
        type: String,
        // required: true
    },
    publisheredBy: {
        type: mongoose.Types.ObjectId,
        // required: true
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
        // required: true,
    }
})

module.exports = mongoose.model('bookdb', bookSchema);
