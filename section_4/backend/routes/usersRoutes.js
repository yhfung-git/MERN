const express = require("express");

const {
  getUsers,
  signup,
  login,
  checkAuthStatus,
  logout,
} = require("../controllers/usersControllers");
const { checkSignupInput } = require("../helpers/validators");
const { handleUpload } = require("../middlewares/fileUpload");
const isAuth = require("../middlewares/isAuth");

const router = express.Router();

router.get("/auth-status", isAuth, checkAuthStatus);

router.get("/logout", isAuth, logout);

router.post("/signup", handleUpload.single("image"), checkSignupInput, signup);

router.post("/login", login);

router.get("/", getUsers);

module.exports = router;
