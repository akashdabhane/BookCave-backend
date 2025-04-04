const bookdb = require('../model/book.model');
const {
    uploadOnCloudinary,
    deleteFromCloudinary
} = require('../utils/cloudinary');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const validateMongodbId = require('../utils/validateMongodbId');
const mongoose = require('mongoose');


// add book
exports.addBook = asyncHandler(async (req, res) => {
    const { title, price, description, category } = req.body;

    if ([title, price, description, category].some(item => {
        !item || item === undefined || item === ""
    })) {
        throw new ApiError(400, "All fields are required");
    }

    const localImagePath = req.file?.path;
    if (!localImagePath) {
        throw new ApiError(400, "Image is required");
    }

    try {
        const result = await uploadOnCloudinary(localImagePath);

        // book info
        const book = await bookdb.create({
            title,
            price,
            description,
            category,
            mrp: req.body?.mrp,
            imageUrl: result?.secure_url,
            author: req.body?.author,
            publisher: req.body?.publisher,
            availablePieces: req.body?.quantity,
            publisheredBy: req.body?.publisheredBy
        })

        return res
            .status(200)
            .json(
                new ApiResponse(200, book, "book info added successfully")
            )
    }
    catch (error) {
        throw new ApiError(500, error.message || "some error occured while adding book")
    }
})


// delete book info 
exports.deleteBook = asyncHandler(async (req, res) => {
    const id = req.params.id;
    validateMongodbId(id);

    const book = await bookdb.findById(id);
    if (!book) {
        throw new ApiError(404, "Book not found");
    }

    // delete book image from cloudinary
    await deleteFromCloudinary(book.imageUrl);

    await bookdb.findByIdAndDelete(id)
    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "Book deleted successfully")
        )
})


// update book info
exports.updateBookInfo = asyncHandler(async (req, res) => {
    // validate request
    if (!req.body) {
        throw new ApiError(400, "Content can not be empty");
    }
    const newData = req.body;

    try {
        const { id } = req.params;
        validateMongodbId(id);

        const book = await bookdb.findById(id);
        if (!book) {
            throw new ApiError("Book not found");
        }

        // Update data in the database
        const updatedData = await bookdb.findByIdAndUpdate(id,
            {
                $set: newData
            }, { new: true });

        return res
            .status(200)
            .json(
                new ApiResponse(200, updatedData, "Book info updated successfully")
            )
    } catch (error) {
        throw new ApiError(500, error.message || "Some error occured while updating book info");
    }
})


// get book info 
exports.getSingleBook = asyncHandler(async (req, res) => {
    const id = req.params.id;
    validateMongodbId(id);

    try {
        const bookInfo = await bookdb.findById(id);

        if (!bookInfo) {
            throw new ApiError(404, "Book not found");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(200, bookInfo, "Book info retrieved!")
            )
    } catch (error) {
        throw new ApiError(500, error.message || "Some error occured while retriving book info");
    }
})


// get all books 
exports.getAllBooks = asyncHandler(async (req, res) => {
    try {
        const allBooks = await bookdb.find({});

        return res
            .status(200)
            .json(
                new ApiResponse(200, allBooks, "All books are fetched successfully")
            )
    } catch (error) {
        throw new ApiError(500, error.message || "Some error occured while retriving data")
    }
})


// search books
exports.searchBooks = asyncHandler(async (req, res) => {
    const searchQuery = req.query?.query;

    if (!searchQuery || searchQuery.length === 0) {
        throw new ApiError(400, "Search query is required");
    }

    try {
        const searchResult = await bookdb.find({
            $text: { $search: searchQuery }
        });

        return res
            .status(200)
            .json(
                new ApiResponse(200, searchResult, "Books matching the search query are fetched successfully")
            )
    } catch (error) {
        throw new ApiError(500, error.message || "Some error occured while searching books");
    }
})


// recently viewed books

exports.getRecentlyViewedBooks = asyncHandler(async (req, res) => {
    const { idArray } = req.body; // Expecting { "ids": ["id1", "id2", ...] }

    if (!Array.isArray(idArray) || idArray.length === 0) {
        return res
            .status(200)
            .json(
                new ApiResponse(200, [], "No recent viewed books found")
            );
    }

    try {
        // Convert string IDs to MongoDB ObjectId
        const objectIds = idArray.map(id => new mongoose.Types.ObjectId(id));

        // Find documents with matching IDs
        const recentlyViewedBooks = await bookdb.find({ _id: { $in: objectIds } });

        return res
            .status(200)
            .json(
                new ApiResponse(200, recentlyViewedBooks, "Recently viewed books are fetched successfully")
            )
    } catch (error) {
        throw new ApiError(500, error.message || "Some error occured while retrieving recently viewed books");
    }
})
