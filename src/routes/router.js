const express = require('express');
const router = express.Router();
const controller = require('../controller/controller')


// API 
router.post('/api/register', controller.register);
router.post('/api/login', controller.login); 

// get single user
router.get('/api/user/:id', controller.getUser); 

// update users info
router.put('/api/user/:id', controller.updateUserInfo)


module.exports = router;