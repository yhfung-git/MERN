const express = require("express");

const { error404 } = require("../controllers/errorsControllers");
const router = express.Router();

router.use(error404);

module.exports = router;
