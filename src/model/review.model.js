const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userdb',
        required: [true, "UserId is required"]
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bookdb',
        required: [true, "BookId is required"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, "Rating is required"]
    },
    reviewMessage: {
        type: String,
        minlength: 3
    }
}, { timestamps: true })

const reviewdb = mongoose.model('reviewdb', reviewSchema);

module.exports = reviewdb; 
