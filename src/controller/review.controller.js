const reviewdb = require('../model/review.model');
const bookdb = require('../model/book.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const validateMongodbId = require("../utils/validateMongodbId");


// create review for the specified book
exports.addReview = asyncHandler(async (req, res) => {
    const { bookId, rating } = req.body;
    if ([bookId, rating].some((field) =>
        !field || (typeof (field) === "string") && field.trim() === ""
    )) {
        throw new ApiError(400, "Please provide valid bookId and rating");
    }

    validateMongodbId(bookId);
    const book = await bookdb.findById(bookId);
    if (!book) {
        throw new ApiError(404, "No such book exists!");
    }

    const review = await reviewdb.create({
        userId: req.user?._id,
        bookId,
        rating,
        reviewMessage: req?.body?.reviewMessage
    })

    return res
        .status(201)
        .json(
            new ApiResponse(201, review, "Review added successfully!")
        )
})

// edit a review for a user who has created that review
exports.editReview = asyncHandler(async (req, res) => {
    if (!req.body) {
        throw new ApiError(400, "Please provide valid data");
    }

    const reviewId = req.params.id;
    validateMongodbId(reviewId);

    const review = await reviewdb.findById(reviewId);
    if (!review) {
        throw new ApiError(404, "No such review exists!");
    }

    if (!review.userId.equals(req.user?._id)) {
        throw new ApiError(403, "You are not authorized to edit this review!");
    }

    const updatedReview = await reviewdb.findByIdAndUpdate(
        reviewId,
        {
            $set: {
                rating: req.body?.rating,
                reviewMessage: req.body?.reviewMessage,
            }
        },
        { new: true }
    );

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedReview, "Review updated successfully!")
        )
})

// delete a review for a user who has created that review
exports.deleteReview = asyncHandler(async (req, res) => {
    const reviewId = req.params.id;
    validateMongodbId(reviewId);

    const review = await reviewdb.findById(reviewId);
    if (!review) {
        throw new ApiError(404, "No such review exists!");
    }

    if (!review.userId.equals(req.user?._id)) {
        throw new ApiError(403, "You are not authorized to delete this review!");
    }

    await reviewdb.findByIdAndDelete(reviewId);

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "Review deleted successfully!")
        )
})

// get a single review for book
exports.getSingleReview = asyncHandler(async (req, res) => {
    const reviewId = req.params.id;
    validateMongodbId(reviewId);

    const review = await reviewdb.findById(reviewId);
    if (!review) {
        throw new ApiError(404, "No such review exists!");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, review, "Review retrieved successfully!")
        )
})

// get all the reviews for book
exports.getReviewsForBook = asyncHandler(async (req, res) => {
    const bookId = req.params.id;
    validateMongodbId(bookId);

    const book = await bookdb.findById(bookId);
    if (!book) {
        throw new ApiError(404, "No such book exists!");
    }

    const reviews = await reviewdb.find({ bookId });

    return res
        .status(200)
        .json(
            new ApiResponse(200, reviews, "Reviews retrieved successfully!")
        )
})