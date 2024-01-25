const express = require("express");

const { USERS } = require("../DUMMY_DATA");

const router = express.Router();

router.get("/", (req, res, next) => {
  const users = USERS.map((user) => user);
  res.status(200).json({ users });
});

module.exports = router;
