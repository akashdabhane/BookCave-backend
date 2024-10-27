const express = require('express');
const bookRouter = express.Router();
const bookController = require('../controller/book.controller');
const verifyJWT = require('../middlewares/auth.middleware');
const upload = require('../middlewares/multer.middleware');

bookRouter.use(verifyJWT);
// API
// add book
bookRouter.post('/add-book', upload.single('image'), bookController.addBook);

// delete book
bookRouter.delete('/book/:id', bookController.deleteBook);

// update book 
bookRouter.patch('/book/:id', bookController.updateBookInfo);

// get all books
bookRouter.get('/all-books', bookController.getAllBooks);

// get book info
bookRouter.get('/book-info/:id', bookController.getSingleBook);


module.exports = bookRouter;