const express = require('express');
const userOperations = require('../controllers/operationController');
const authController = require('../controllers/authController');
const operationRouter = express.Router();
operationRouter.use(authController.verifyToken);
operationRouter.route('/upload').get(userOperations.upload);
module.exports = operationRouter;