const express = require('express');
const almsController = require('../controllers/almsController');
const almsRouter = express.Router();
almsRouter.route('/add').post(almsController.addAlms);
almsRouter.route('/edit').post(almsController.editAlms);
almsRouter.route('/delete').post(almsController.deleteAlms);
almsRouter.route('/all').get(almsController.getAllAlms);
module.exports = almsRouter;
