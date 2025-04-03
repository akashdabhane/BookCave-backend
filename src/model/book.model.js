const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        
    },
    imageUrl: {
        type: String,
        required: true,
    },
    mrp: {
        type: Number,
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
    category: {
        type: String,
        enum: ['educational', 'fiction', 'non-fiction', 'biography', 'autobiography', 'essay', 'encyclopedia'],
        required: [true, "category is required"],
    }
});

// Create a text index on title, description and author fields
bookSchema.index({ title: "text", description: "text", author: "text" });

const bookdb = mongoose.model('bookdb', bookSchema);

module.exports = bookdb;