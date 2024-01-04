const {Router: expressRouter} = require("express");
const router = expressRouter();
const emailController = require('../controllers/emailController');

// auth routes

const authRouter = require('./authRoutes');
router.use("/auth",authRouter);


// get list of files and images routes

const listRouter = require('./listRoutes');
router.use("/list", listRouter);


//send email

router.route('/email').post(emailController.sendEmail);

// user triggered operation routes
const operationRouter = require('./operaionRoutes');
router.use("/operation", operationRouter);
module.exports = router;