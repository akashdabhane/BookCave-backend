const ordersdb = require('../model/order.model');
const bookdb = require('../model/book.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const validateMongodbId = require('../utils/validateMongodbId');

// place an order
exports.createOrder = asyncHandler(async (req, res) => {
    const { bookId, totalAmount, quantity, address } = req.body;
    const orderBy = req.user?._id;
    if (
        [bookId, totalAmount, quantity].some((field) => !field)
    ) {
        throw new ApiError(400, "orderBy, bookId, totalAmount, quantity fields are required")
    }
    validateMongodbId(orderBy);
    validateMongodbId(bookId);
    validateMongodbId(address);

    const book = await bookdb.findById(bookId);
    if (!book) {
        throw new ApiError(400, "Book not found");
    }

    try {
        const order = await ordersdb.create({
            orderBy,
            bookId,
            quantity,
            totalAmount,
            address
        })

        return res
            .status(200)
            .json(
                new ApiResponse(200, order, "Order placed successfully")
            )

    } catch (error) {
        throw new ApiError(400, error.message || "Something went wrong");
    }
});


// cancel order (only user who has permission to cancel)
exports.cancelOrder = asyncHandler(async (req, res) => {
    const orderId = req.params.id;
    const userId = req.user?._id;

    validateMongodbId(orderId);

    let order = await ordersdb.findById(orderId);
    if (!order) {
        throw new ApiError(400, "Order not found");
    }

    if (!order.orderBy.equals(userId)) {
        throw new ApiError(403, "Only user who placed the order can cancel it");
    }

    order.status = "cancelled";
    const updatedOrder = await order.save();

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedOrder, "Order cancelled successfully")
        )
})


// get details of order (detailed information)
exports.getOrderDetails = asyncHandler(async (req, res) => {
    const orderId = req.params.id;
    const userId = req.user?._id;

    validateMongodbId(orderId);

    let order = await ordersdb.findById(orderId);
    if (!order) {
        throw new ApiError(400, "Order not found");
    }

    if (!order.orderBy.equals(userId)) {
        throw new ApiError(403, "Only user who placed the order can view its details");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, order, "Order details retrieved successfully")
        )
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