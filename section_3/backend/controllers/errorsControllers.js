const { throwError } = require("../helpers/errorHandler");

exports.error404 = (req, res, next) => {
  throwError(404, "Page not found.");
};
