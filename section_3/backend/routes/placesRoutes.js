const express = require("express");

const {
  getPlaceById,
  getPlacesByUserId,
} = require("../controllers/placesController");

const router = express.Router();

router.get("/user/:uid", getPlacesByUserId);

router.get("/:pid", getPlaceById);

module.exports = router;
