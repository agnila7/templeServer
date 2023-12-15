const express = require('express');
const userOperations = require('../controllers/operationController');
const authController = require('../controllers/authController');
const operationRouter = express.Router();
const eventRouter = require('./eventRoutes');
operationRouter.use(authController.verifyToken);

// Event routes
operationRouter.use("/event",eventRouter);

// upload route
operationRouter.route('/upload').get(userOperations.upload);

module.exports = operationRouter;