const express = require('express');
const authController = require('../controllers/authController');
const uploadController = require('../controllers/uploadController');
const uploadRouter = express.Router();
uploadRouter.use(authController.verifyAdmin);
uploadRouter.route('/files').post(uploadController.uploadFiles);
uploadRouter.route('/images').post(uploadController.uploadImages);
module.exports = uploadRouter;