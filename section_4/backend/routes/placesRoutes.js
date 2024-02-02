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
const { handleUpload } = require("../middlewares/fileUpload");
const isAuth = require("../middlewares/isAuth");

const router = express.Router();

router.get("/user/:uid", getPlacesByUserId);

router.get("/show/:pid", getPlaceById);

router.post(
  "/new",
  isAuth,
  handleUpload.single("image"),
  checkCreatePlaceInput,
  createPlace
);

router.patch("/update/:pid", isAuth, checkUpdatePlaceInput, updatePlace);

router.delete("/delete/:pid", isAuth, deletePlace);

module.exports = router;
