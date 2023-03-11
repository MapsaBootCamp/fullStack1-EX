const express = require("express");
const { userController, userService } = require("../modules").userApp;
const { userValidator } = require("../validators");
const { checkError } = require("../middlewares");
const router = express.Router();

router.get("/:id/info", userController.get);
router.get("/list", userController.getAll);
router.post(
  "/",
  userValidator.userCreateValidator,
  checkError,
  userController.create
);
module.exports = router;
