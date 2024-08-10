const express = require('express'); 
const ordersRouter = express.Router(); 
const ordersController = require('../controller/ordersController')


// create order 
ordersRouter.post('/api/orders/create-order', ordersController.createOrder); 

// get all orders of user
ordersRouter.get('/api/orders/:id', ordersController.getAllOrdersUser)


module.exports = ordersRouter

