const express = require('express');
const fileListController = require('../controllers/fileController');
const listRouter = express.Router();
listRouter.route('/images').get(fileListController.getImages);
listRouter.route('/files').get(fileListController.getFiles);
module.exports = listRouter;