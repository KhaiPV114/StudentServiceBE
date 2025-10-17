const express = require('express');
const createError = require('http-errors');


const router = express.Router();
const roomRouter = require('./room.route');
const userRouter = require('./user.route');
const authRouter = require('./auth.route');

// Routes
router.use('/rooms', roomRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter); // Authentication


// Handle 404 (if not matched any route)
router.use((req, res, next) => {
    next(createError.NotFound());
});

module.exports =  router;

