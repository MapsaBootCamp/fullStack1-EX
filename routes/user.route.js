const express = require("express");
const { userController} = require("../modules").userApp;
const { userValidator } = require("../validators");
const { checkError, tokenAuthentication } = require("../middlewares");
const router = express.Router();

router.get("/:id/info", userController.get);
router.get("/list", tokenAuthentication, checkError,userController.getAll);
router.post(
  "/",
  userValidator.userCreateValidator,
  checkError,
  userController.create
);
router.post(
  "/login",
  userValidator.userLoginValidator,
  checkError,
  userController.login
);
router.put("/:id/update", userController.update);
router.delete("/:id/delete", userController.delete);
module.exports = router;
