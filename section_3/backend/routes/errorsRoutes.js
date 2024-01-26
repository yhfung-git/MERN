const express = require("express");

const { error404 } = require("../controllers/errorsController");
const router = express.Router();

router.use(error404);

module.exports = router;
