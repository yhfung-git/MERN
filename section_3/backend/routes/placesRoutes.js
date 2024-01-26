const express = require("express");

const {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace,
} = require("../controllers/placesControllers");

const router = express.Router();

router.post("/new", createPlace);

router.get("/show/:pid", getPlaceById);

router.patch("/update/:pid", updatePlace);

router.delete("/delete/:pid", deletePlace);

router.get("/user/:uid", getPlacesByUserId);

module.exports = router;
