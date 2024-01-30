const express = require("express");

const { getUsers, signup, login } = require("../controllers/usersControllers");
const { checkSignupInput } = require("../helpers/validators");
const fileUpload = require("../middlewares/fileUpload");

const router = express.Router();

router.post("/signup", fileUpload.single("image"), checkSignupInput, signup);

router.post("/login", login);

router.get("/", getUsers);

module.exports = router;
