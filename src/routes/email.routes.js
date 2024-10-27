const express = require('express');
const emailRouter = express.Router();
const emailController = require('../controller/email.controller');
const verifyJWT = require('../middlewares/auth.middleware');

emailRouter.use(verifyJWT);
// API
// send email
emailRouter.post('/contact-us', emailController.sendEmail)

module.exports = emailRouter; 
