const bcrypt = require("bcrypt");

const { throwError } = require("../helpers/errorHandler");
const { validationErrorHandler } = require("../helpers/validationErrorHandler");
const { normalizeEmail } = require("validator");
const User = require("../models/User");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, "-password");
    res.status(200).json({ users });
  } catch (error) {
    console.error(">>> getUsers", error);
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  try {
    const validationPassed = await validationErrorHandler(req, res, next);
    if (!validationPassed) return;

    const { name, email } = req.body;
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      image: req.file.path,
      places: [],
    });

    const newUserSaved = await newUser.save();
    if (!newUserSaved) throwError(500, "Failed to create account");

    const { password, ...userExcludedPassword } = newUserSaved._doc;

    res.status(201).json({
      message: "You've successfully signed up!",
      user: userExcludedPassword,
    });
  } catch (error) {
    console.error(">>> signup", error);
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: normalizeEmail(email) });
    if (!user) throwError(401, "Invalid email or password");

    const passwordMatched = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatched) throwError(401, "Invalid email or password");

    const { password, ...userExcludedPassword } = user._doc;

    res.status(200).json({
      message: "You've successfully logged in!",
      user: userExcludedPassword,
    });
  } catch (error) {
    console.error(">>> login", error);
    next(error);
  }
};
