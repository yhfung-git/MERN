const jwt = require("jsonwebtoken");
const { JWT_PASSKEY } = process.env;
const { throwError } = require("../helpers/errorHandler");

module.exports = async (req, res, next) => {
  try {
    if (req.method === "OPTIONS") return next();

    const token = await req.get("Authorization")?.split(" ")[1];
    if (!token) throwError(401, "Not authenticated");

    const decoded = jwt.verify(token, JWT_PASSKEY, { ignoreExpiration: false });
    if (!decoded) throwError(401, "Not authenticated");

    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTimestamp) {
      throwError(401, "Token has expired");
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error(">>> auth", error);
    next(error);
  }
};
