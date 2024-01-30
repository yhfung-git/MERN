const { body } = require("express-validator");
const User = require("../models/User");

exports.checkUpdatePlaceInput = [
  body("title")
    .trim()
    .exists({ checkFalsy: true })
    .withMessage("You must enter a title")
    .matches(/^[a-zA-Z0-9\s]+$/) // letters, numbers and whitespaces
    .withMessage("Title must only contain letters and numbers"),
  body("description")
    .trim()
    .exists({ checkFalsy: true })
    .withMessage("You must enter a description")
    .isLength({ min: 5 })
    .withMessage("Description must be at least 5 characters long"),
];

exports.checkCreatePlaceInput = [
  ...this.checkUpdatePlaceInput,
  body("address")
    .trim()
    .exists({ checkFalsy: true })
    .withMessage("You must enter an address"),
];

exports.checkSignupInput = [
  body("name")
    .trim()
    .exists({ checkFalsy: true })
    .withMessage("You must enter a name"),
  body("email")
    .trim()
    .exists({ checkFalsy: true })
    .withMessage("You must enter an email")
    .normalizeEmail()
    .isEmail()
    .withMessage("You must enter a valid email")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("Email already exists");
      }
      return true;
    }),
  body("password")
    .trim()
    .exists({ checkFalsy: true })
    .withMessage("You must enter a password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("image").custom((value, { req }) => {
    if (!req.file || !req.file.mimetype.startsWith("image")) {
      throw new Error("Invalid image type");
    }
    return true;
  }),
];
