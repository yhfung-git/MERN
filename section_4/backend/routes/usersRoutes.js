const express = require("express");

const { getUsers, singup, login } = require("../controllers/usersControllers");
const { checkSignupInput } = require("../helpers/validators");

const router = express.Router();

router.post("/signup", checkSignupInput, singup);

router.post("/login", login);

router.get("/", getUsers);

module.exports = router;
