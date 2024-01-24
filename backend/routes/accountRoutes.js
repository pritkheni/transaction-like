const express = require("express");
const { getBalance, transfer } = require("../controller/AccountControllers");
const { authJwtToken } = require("../middleware/authMiddlerware");
const accountRouter = express.Router();

accountRouter.route("/balance").get(authJwtToken, getBalance);
accountRouter.route("/transfer").post(authJwtToken, transfer);
module.exports = accountRouter;
