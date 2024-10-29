const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const validateMongodbId = require("../utils/validateMongodbId");
const addressdb = require('../model/address.model');


// add address (in user account)
exports.addAddress = asyncHandler(async (req, res) => {
    const { street, city, state, country, pincode, phone } = req.body;
    const userId = req.user?._id;

    if ([street, city, state, country, pincode].some((field) =>
        !field || field.trim() === ""
    )) {
        throw new ApiError(400, "All fields are required");
    }

    const addedAddress = await addressdb.create({
        userId,
        addressType: req.body?.addressType,
        street,
        city,
        state,
        country,
        pincode,
        contactNumber: phone,
    })

    return res
        .status(201)
        .json(
            new ApiResponse(201, addedAddress, "Address added successfully")
        );
})

// remove/delete address (from user account)
exports.removeAddress = asyncHandler(async (req, res) => {
    const { addressId } = req.body;
    const userId = req.user?._id;

    if (!addressId) {
        throw new ApiError(400, "Address id is required");
    }
    validateMongodbId(addressId);

    const address = await addressdb.findById(addressId);
    if (!address || !address.userId.equals(userId)) {
        throw new ApiError(404, "Address not found or not associated with the user");
    }

    await addressdb.findByIdAndDelete(addressId);

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "Address removed successfully")
        );
})


// update address
exports.updateAddress = asyncHandler(async (req, res) => {
    const { addressId } = req.body;
    const userId = req.user._id;

    if (!addressId) {
        throw new ApiError(400, "Address id is required");
    }
    validateMongodbId(addressId);

    const address = await addressdb.findById(addressId);
    if (!address || !address.userId.equals(userId)) {
        throw new ApiError(404, "Address not found or not associated with the user");
    }

    const updatedAddress = await addressdb.findByIdAndUpdate(
        addressId,
        {
            addressType: req.body?.addressType,
            street: req.body?.street,
            city: req.body?.city,
            state: req.body?.state,
            country: req.body?.country,
            pincode: req.body?.pincode,
            contactNumber: req.body?.phone,
        },
        { new: true }
    )

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedAddress, "Address updated successfully")
        );
})


// get address (from user account)  // single address
exports.getSingleAddress = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const addressId = req.params.id;

    if (!addressId) {
        throw new ApiError(400, "Address id is required");
    }
    validateMongodbId(addressId);

    const addresses = await addressdb.findById(addressId);

    if (!addresses || !addresses.userId.equals(userId)) {
        throw new ApiError(404, "Address not found or not associated with the user");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, addresses, "Addresses retrieved successfully")
        );
})


// get all addresses associated with user account
exports.getAllAdresses = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const addresses = await addressdb.find({ userId });

    return res
        .status(200)
        .json(
            new ApiResponse(200, addresses, "Addresses retrieved successfully")
        );
})