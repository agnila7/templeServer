const express = require('express');
const eventController = require('../controllers/eventController');
const eventRouter = express.Router();
eventRouter.route('/add').post(eventController.addEvent);
eventRouter.route('/edit').post(eventController.editEvent);
eventRouter.route('/delete').post(eventController.deleteEvent);
eventRouter.route('/all').get(eventController.getAllEvents);
module.exports = eventRouter;
