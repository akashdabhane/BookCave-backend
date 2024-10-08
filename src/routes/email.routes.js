const express = require('express');
const emailRouter = express.Router();
const emailController = require('../controller/email.controller');

// API
// send email
emailRouter.post('/contact-us', emailController.sendEmail)

module.exports = emailRouter; 
