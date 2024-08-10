const express = require('express'); 
const ordersRouter = express.Router(); 
const ordersController = require('../controller/order.controller')


// create order 
ordersRouter.post('/create-order', ordersController.createOrder); 

// get all orders of user
ordersRouter.get('/:id', ordersController.getAllOrdersUser)


module.exports = ordersRouter

