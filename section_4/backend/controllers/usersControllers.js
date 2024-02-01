const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_PASSKEY, NODE_ENV } = process.env;

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

    const { name, email, password } = req.body;
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      image: req.file.path,
      places: [],
    });

    const newUserSaved = await newUser.save();
    if (!newUserSaved) throwError(500, "Failed to create account");

    const userId = newUserSaved._id.toString();
    const token = jwt.sign({ userId }, JWT_PASSKEY, {
      expiresIn: "1h",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "Lax",
        maxAge: 60 * 60 * 1000,
      })
      .status(201)
      .json({
        message: "You've successfully signed up!",
        userId,
      });
  } catch (error) {
    console.error(">>> signup", error);
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: normalizeEmail(email) });
    if (!user) throwError(401, "Invalid email or password");

    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) throwError(401, "Invalid email or password");

    const userId = user._id.toString();
    const token = jwt.sign({ userId }, JWT_PASSKEY, {
      expiresIn: "1h",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "Lax",
        maxAge: 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "You've successfully logged in!",
        userId,
      });
  } catch (error) {
    console.error(">>> login", error);
    next(error);
  }
};

exports.checkAuthStatus = async (req, res, next) => {
  try {
    res.status(200).json({ userId: req.userId });
  } catch (error) {
    console.error(">>> checkAuthStatus", error);
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    res
      .clearCookie("token")
      .status(200)
      .json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(">>> logout", error);
    next(error);
  }
};
