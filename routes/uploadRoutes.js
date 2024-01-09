const express = require('express');
const uploadController = require('../controllers/uploadController');
const uploadRouter = express.Router();
uploadRouter.route('/images').post(uploadController.uploadImages);
uploadRouter.route('/files').post(uploadController.uploadFiles);
module.exports = uploadRouter;