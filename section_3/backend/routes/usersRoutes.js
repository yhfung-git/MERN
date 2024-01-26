const express = require("express");

const { getUsers, singup, login } = require("../controllers/usersControllers");

const router = express.Router();

router.post("/signup", singup);

router.post("/login", login);

router.get("/", getUsers);

module.exports = router;
