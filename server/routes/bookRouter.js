const express = require('express');
const bookRouter = express.Router();
const bookController = require('../controller/bookController');

// API
// add book
bookRouter.post('/api/book', bookController.addBook);

// delete book
bookRouter.delete('/api/book/:id', bookController.deleteBook);

// update book 
bookRouter.put('/api/book/:id', bookController.updateBookInfo);

// get all books
bookRouter.get('/api/all-books', bookController.getAllBooks);

// get book info
bookRouter.get('/api/book-info/:id', bookController.getSingleBook);


module.exports = bookRouter;


