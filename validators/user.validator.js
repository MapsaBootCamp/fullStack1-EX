const { body, check } = require("express-validator");
const db = require("../db");

exports.userCreateValidator = [
  body("email").isEmail().trim().escape(),
  check("email").custom(async (val) => {
    try {
      const user = await db.user.findFirst({
        where: { email: val },
      });
      if (user) {
        return Promise.reject("chenin useri az qabl darim");
      }
    } catch (error) {
      return Promise.reject(error.message);
    }
  }),
  check("name")
    .notEmpty()
    .withMessage("name field should not be empty")
    .isLength({ min: 5 })
    .withMessage("name should be at least 5 characters")
    .trim()
    .escape(),

  check("sex").isBoolean().withMessage("jensiat bayad boolean bashe"),
  check("password")
    .notEmpty()
    .withMessage("password should not be empty")
    .isLength({ min: 3 })
    .withMessage("pass should have at least 3 characters"),
];
