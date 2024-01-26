const { USERS } = require("../DUMMY_DATA");
const { throwError } = require("../helpers/errorHandler");

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
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throwError(400, "All fields are required");
    }

    const existingUser = USERS.find((u) => u.email === email);
    if (existingUser) throwError(409, "email already exists");

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      image: "",
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
    const { email, password } = req.body;

    const user = USERS.find((u) => u.email === email);
    if (!user || user.password !== password) {
      throwError(401, "Invalid email or password");
    }

    res.status(200).json({ message: "Logged in!" });
  } catch (error) {
    console.error(">>> login", error);
    next(error);
  }
};
