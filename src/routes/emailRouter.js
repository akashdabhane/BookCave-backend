const express = require('express');
const emailRouter = express.Router();
const emailController = require('../controller/emailController');

// API
// send email
emailRouter.post('/api/contact-us', emailController.sendEmail)

module.exports = emailRouter; 
