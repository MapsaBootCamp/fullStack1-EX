const { body, check } = require("express-validator");
const db = require("../db");

exports.userCreateValidator = [
  body("email").isEmail().trim().escape(),
  check("email").custom(async (val) => {
    try {
      const find = await db.user.findUnique({
        where: {
          email: val,
        },
      });

      if (find) {
        return Promise.reject("hamchin useri darim!");
      }

      return val;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }),

  body("password").notEmpty().isLength({ min: 4 }),
];

exports.updateuserValidator = [
  body("email").isEmail().trim().escape(),
  body("password").notEmpty().isLength({ min: 4 }),
];
