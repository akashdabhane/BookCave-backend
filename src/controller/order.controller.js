const ordersdb = require('../model/order.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const validateMongodbId = require('../utils/validateMongodbId');


exports.createOrder = asyncHandler(async (req, res) => {
    const { orderBy, bookId, totalAmount, quantity } = req.body;
    if (
        [orderBy, bookId, totalAmount, quantity].some((field) =>
            field?.trim() === "" || field.trim() === undefined || field.trim() === null
        )
    ) {
        throw new ApiError(400, "orderBy, bookId, totalAmount, quantity fields are required")
    }

    try {
        const order = await ordersdb.create({
            orderBy,
            bookId,
            quantity,
            totalAmount,
        })

        return res
            .status(200)
            .json(
                new ApiResponse(200, order, "Order placed successfully")
            )

    } catch (error) {
        throw new ApiError(400, error.message || "Something went wrong");
    }
})


// get all orders of logged in user 
exports.getAllOrdersUser = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    try {
        const allOrdersOfUser = await ordersdb.find({ orderBy: userId });

        return res
            .status(200)
            .json(
                new ApiResponse(200, allOrdersOfUser, "Order history retrieved successfully")
            )
    } catch (error) {
        throw new ApiError(400, error.message || "Internal server error");
    }
})