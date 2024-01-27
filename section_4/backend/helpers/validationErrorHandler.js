const { validationResult } = require("express-validator");
const { throwError } = require("./errorHandler");

exports.validationErrorHandler = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throwError(422, errors.array()[0].msg);
    }

    return true;
  } catch (error) {
    console.error(">>> validationErrorHandler", error);
    next(error);
  }
};
