const express = require('express');
const addressRouter = express.Router();
const addressController = require('../controller/address.controller');
const verifyJWT = require('../middlewares/auth.middleware');

addressRouter.use(verifyJWT);

// add address
addressRouter.post('/add-address', addressController.addAddress);

// remove address
addressRouter.delete('/remove-address', addressController.removeAddress);

// update address
addressRouter.put('/update-address', addressController.updateAddress);

// get all addresses of user
addressRouter.get('/all-addresses', addressController.getAllAdresses);

// get single address
addressRouter.get('/:id', addressController.getSingleAddress);



module.exports = addressRouter;