const { throwError } = require("../helpers/errorHandler");
const { validationErrorHandler } = require("../helpers/validationErrorHandler");
const getCoordsForAddress = require("../utils/location");
const Place = require("../models/Place");
const User = require("../models/User");

exports.getPlaceById = async (req, res, next) => {
  try {
    const { pid } = req.params;

    const place = await Place.findById(pid);
    if (!place) throwError(404, "Could not find a place for the provided id.");

    res.status(200).json({ place });
  } catch (error) {
    console.error(">>> getPlaceById", error);
    next(error);
  }
};

exports.getPlacesByUserId = async (req, res, next) => {
  try {
    const { uid } = req.params;

    const user = await User.findById(uid);
    if (!user) throwError(404, "User not found");

    const places = await Place.find({ creator: uid });

    res.status(200).json({ places });
  } catch (error) {
    console.error(">>> getPlacesByUserId", error);
    next(error);
  }
};

exports.createPlace = async (req, res, next) => {
  try {
    const validationPassed = await validationErrorHandler(req, res, next);
    if (!validationPassed) return;

    const { title, description, address, creator, image } = req.body;

    const location = await getCoordsForAddress(address);
    if (!location) return;

    const createdPlace = new Place({
      title,
      description,
      image,
      address,
      location,
      creator,
    });

    const createdPlaceSaved = await createdPlace.save();
    if (!createdPlaceSaved) throwError(500, "Failed to create new place");

    res
      .status(201)
      .json({ message: "New place created!", place: createdPlaceSaved });
  } catch (error) {
    console.error(">>> createPlace", error);
    next(error);
  }
};

exports.updatePlace = async (req, res, next) => {
  try {
    const validationPassed = await validationErrorHandler(req, res, next);
    if (!validationPassed) return;

    const { pid } = req.params;
    const { title, description } = req.body;

    const updatedPlace = await Place.findByIdAndUpdate(
      pid,
      { title, description },
      { new: true, runValidators: true }
    );

    if (!updatedPlace) throwError(500, "Failed to update the place");

    res.status(200).json({ message: "Place updated!", place: updatedPlace });
  } catch (error) {
    console.error(">>> updatePlace", error);
    next(error);
  }
};

exports.deletePlace = async (req, res, next) => {
  try {
    const { pid } = req.params;

    const deletedPlace = await Place.findByIdAndDelete(pid);
    if (!deletedPlace) throwError(500, "Failed to delete the place");

    res.status(200).json({ message: "Place deleted!" });
  } catch (error) {
    console.error(">>> deletePlace", error);
    next(error);
  }
};
