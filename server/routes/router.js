const express = require('express');
const router = express.Router();
const controller = require('../controller/controller')


// API 
router.post('/api/register', controller.register);
router.post('/api/login', controller.login); 


module.exports = router;