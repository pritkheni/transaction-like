const express = require("express");
const mainRouter = express.Router();
const userRouter = require("./userRoutes");
const accountRouter = require("./accountRoutes");
mainRouter.use("/user", userRouter);
mainRouter.use("/account", accountRouter);
module.exports = mainRouter;
