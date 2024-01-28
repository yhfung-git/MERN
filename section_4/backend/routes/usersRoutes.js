const express = require("express");

const { getUsers, signup, login } = require("../controllers/usersControllers");
const { checkSignupInput } = require("../helpers/validators");

const router = express.Router();

router.post("/signup", checkSignupInput, signup);

router.post("/login", login);

router.get("/", getUsers);

module.exports = router;
