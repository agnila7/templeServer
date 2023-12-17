const express = require('express');
const authController = require('../controllers/authController');
const operationRouter = express.Router();
const eventRouter = require('./eventRoutes');
const uploadRouter = require('./uploadRoutes');
operationRouter.use(authController.verifyToken);

// Event routes
operationRouter.use("/event",eventRouter);

// upload route
operationRouter.use('/upload',uploadRouter);

module.exports = operationRouter;