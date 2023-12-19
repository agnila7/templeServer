const {Router: expressRouter} = require("express");
const router = expressRouter();

// auth routes

const authRouter = require('./authRoutes');
router.use("/auth",authRouter);


// get list of files and images routes

const listRouter = require('./listRoutes');
router.use("/list", listRouter);


// user triggered operation routes
const operationRouter = require('./operaionRoutes');
router.use("/operation", operationRouter);
module.exports = router;