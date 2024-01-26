const express = require("express");

const {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
} = require("../controllers/placesController");

const router = express.Router();

router.get("/user/:uid", getPlacesByUserId);

router.get("/:pid", getPlaceById);

router.post("/new", createPlace);

module.exports = router;
