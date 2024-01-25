const HttpError = require("../models/HttpError");

exports.throwError = (errorCode, message) => {
  throw new HttpError(errorCode, message);
};

exports.nextError = (errorCode, message, next) => {
  return next(new HttpError(errorCode, message));
};
