const express = require("express");
const { userControl } = require("../../contoroller").userControl;

const { checkError } = require("../middleWares/error.validation");
const { userValidator } = require("../../validator");

const router = express.Router();

router.get("/:id/info", userControl.get);
router.get("/all", userControl.getAll);
router.post(
  "/register",
  userValidator.userCreateValidator,
  checkError,
  userControl.create
);
router.put(
  "/:id/update",
  userValidator.updateuserValidator,
  checkError,
  userControl.update
);
router.delete("/:id/delete", userControl.delete);

module.exports = router;
