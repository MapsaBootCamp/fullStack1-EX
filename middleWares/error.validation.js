const { validationResult } = require("express-validator");

exports.checkError = (req, res, next) => {
  const error = validationResult(req);

  if (error.length > 0) {
    return res.status(400).json({
      error: true,
      message: error.message,
    });
  }
  next();
};
