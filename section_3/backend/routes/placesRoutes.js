const express = require("express");

const {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace,
} = require("../controllers/placesControllers");
const {
  checkUpdatePlaceInput,
  checkCreatePlaceInput,
} = require("../helpers/validators");

const router = express.Router();

router.post("/new", checkCreatePlaceInput, createPlace);

router.get("/show/:pid", getPlaceById);

router.patch("/update/:pid", checkUpdatePlaceInput, updatePlace);

router.delete("/delete/:pid", deletePlace);

router.get("/user/:uid", getPlacesByUserId);

module.exports = router;
