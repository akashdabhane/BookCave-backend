const express = require('express');
const router = express.Router();
const controller = require('../controller/user.controller')


// API 
router.post('/register', controller.register);
router.post('/login', controller.login); 

// get single user
router.get('/user/:id', controller.getUser); 

// update users info
router.put('/user/:id', controller.updateUserInfo)


module.exports = router;