const express = require('express');
const authRouter = express.Router();
const { AuthController } = require('../controllers');
// Route for user login
// authRouter.post('/login', AuthController.login);

// Route for user registration
authRouter.post('/register', AuthController.register); 
authRouter.post('/login', AuthController.login);

module.exports = authRouter;