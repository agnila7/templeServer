const {Router: expressRouter} = require("express");
const router = expressRouter();

// auth routes

const authRouter = require('./authRoutes');
router.use("/auth",authRouter);


// user triggered operation routes
const operationRouter = require('./operaionRoutes');
router.use("/operation", operationRouter);
module.exports = router;