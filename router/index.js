const express = require('express');
const createError = require('http-errors');


const router = express.Router();
const roomRouter = require('./room.route');


// Routes
router.use('/rooms', roomRouter);


// Handle 404 (if not matched any route)
router.use((req, res, next) => {
    next(createError.NotFound());
});

module.exports =  router;

