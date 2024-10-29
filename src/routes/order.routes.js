const express = require('express'); 
const ordersRouter = express.Router(); 
const ordersController = require('../controller/order.controller');
const verifyJWT = require('../middlewares/auth.middleware');


ordersRouter.use(verifyJWT);

// create order 
ordersRouter.post('/create-order', ordersController.createOrder); 

// cancel order // :id is for order document
ordersRouter.patch('/cancel-order/:id', ordersController.cancelOrder); 

// get all orders of user
ordersRouter.get('/all-orders', ordersController.getAllOrdersUser);

// get single order details // :id is for order document
ordersRouter.get('/:id', ordersController.getOrderDetails);

module.exports = ordersRouter

