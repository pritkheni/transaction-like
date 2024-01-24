const express = require("express");
const userRouter = express.Router();
const {
  singinUser,
  singupUser,
  updateUser,
  filterBulk,
} = require("../controller/userController");
const { authJwtToken } = require("../middleware/authMiddlerware");
userRouter.route("/").post((req, res) => {
  res.send("hi there");
});

userRouter.route("/").put(authJwtToken, updateUser);
userRouter.route("/signup").post(singupUser);
userRouter.route("/signin").post(singinUser);
userRouter.route("/bulk").get(filterBulk);
module.exports = userRouter;
