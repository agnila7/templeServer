const express = require('express');
const operationRouter = express.Router();
const eventRouter = require('./eventRoutes');
const almsRouter = require('./almsRoutes');
const uploadRouter = require('./uploadRoutes');

// Event routes
operationRouter.use("/event",eventRouter.eventRouter);
operationRouter.use("/event",eventRouter.eventRouterProtected);

// Alms routes
operationRouter.use("/alms",almsRouter.almsRouter);
operationRouter.use("/alms",almsRouter.almsRouterProtected);

// upload route
operationRouter.use('/upload',uploadRouter);

module.exports = operationRouter;