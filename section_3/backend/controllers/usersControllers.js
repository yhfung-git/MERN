const { USERS } = require("../DUMMY_DATA");
const { throwError } = require("../helpers/errorHandler");
const { validationErrorHandler } = require("../helpers/validationErrorHandler");
const { normalizeEmail } = require("validator");

exports.getUsers = async (req, res, next) => {
  try {
    res.status(200).json({ users: USERS });
  } catch (error) {
    console.error(">>> getUsers", error);
    next(error);
  }
};

exports.singup = async (req, res, next) => {
  try {
    const validationPassed = await validationErrorHandler(req, res, next);
    if (!validationPassed) return;

    const { name, email, password } = req.body;

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      image:
        "https://buffer.com/library/content/images/2023/10/free-images.jpg",
      places: 0,
    };
    USERS.push(newUser);

    res
      .status(201)
      .json({ message: "You've successfully signed up!", user: newUser });
  } catch (error) {
    console.error(">>> signup", error);
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const validationPassed = await validationErrorHandler(req, res, next);
    if (!validationPassed) return;

    const { email, password } = req.body;

    const user = USERS.find((u) => u.email === normalizeEmail(email));
    if (!user || user.password !== password) {
      throwError(401, "Invalid email or password");
    }

    res.status(200).json({ message: "Logged in!" });
  } catch (error) {
    console.error(">>> login", error);
    next(error);
  }
};
