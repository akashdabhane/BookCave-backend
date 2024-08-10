const express = require('express');
const bookRouter = express.Router();
const bookController = require('../controller/book.controller');

// API
// add book
bookRouter.post('/add-book', bookController.addBook);

// delete book
bookRouter.delete('/book/:id', bookController.deleteBook);

// update book 
bookRouter.put('/book/:id', bookController.updateBookInfo);

// get all books
bookRouter.get('/all-books', bookController.getAllBooks);

// get book info
bookRouter.get('/book-info/:id', bookController.getSingleBook);


module.exports = bookRouter;


