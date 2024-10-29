const express = require('express');
const reviewRouter = express.Router();
const reviewController = require('../controller/review.controller');
const verifyJWT = require('../middlewares/auth.middleware');

reviewRouter.use(verifyJWT);

// create review
reviewRouter.post('/create-review', reviewController.addReview);

// update review    // :id is for review document
reviewRouter.patch('/update-review/:id', reviewController.editReview);

// delete review    // :id is for review document
reviewRouter.delete('/delete-review/:id', reviewController.deleteReview);

// get single review    // :id is for review document
reviewRouter.get('/review/:id', reviewController.getSingleReview);

// get all reviews of a book    // :id is for book id
reviewRouter.get('/all-reviews/:id', reviewController.getReviewsForBook);


module.exports = reviewRouter;