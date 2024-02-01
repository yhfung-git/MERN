const mongoose = require("mongoose");

const { throwError } = require("../helpers/errorHandler");
const { validationErrorHandler } = require("../helpers/validationErrorHandler");
const { deleteImage } = require("../utils/deleteImage");
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

    const user = await User.findById(uid).populate("places");
    if (!user) throwError(404, "User not found");
    const places = user.places;

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

    const { title, description, address } = req.body;

    const user = await User.findById(req.userId);
    if (!user) throwError(404, "User not found");

    const location = await getCoordsForAddress(address);
    if (!location) return;

    const createdPlace = new Place({
      title,
      description,
      image: req.file.path,
      address,
      location,
      creator: req.userId,
    });

    const session = await mongoose.startSession();
    session.startTransaction();

    const createdPlaceSaved = await createdPlace.save({ session });
    if (!createdPlaceSaved) throwError(500, "Failed to create new place");

    user.places.push(createdPlaceSaved);
    const userSaved = await user.save({ session });
    if (!userSaved) throwError(500, "Failed to update user's places");

    await session.commitTransaction();

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

    const place = await Place.findById(pid);
    if (!place) throwError(404, "Place not found");

    if (place.creator.toString() !== req.userId) {
      throwError(403, "Not authorized to edit the place");
    }

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

    const session = await mongoose.startSession();
    session.startTransaction();

    const place = await Place.findById(pid);
    if (!place) throwError(404, "Place not found");

    if (place.creator.toString() !== req.userId) {
      throwError(403, "Not authorized to delete the place");
    }

    const updatedUserPlaces = await User.updateOne(
      { _id: place.creator },
      { $pull: { places: pid } },
      { session }
    );
    if (updatedUserPlaces.modifiedCount === 0) {
      throwError(500, "Failed to remove place from user's places");
    }

    const deletedPlace = await Place.findByIdAndDelete(pid).session(session);
    if (!deletedPlace) throwError(500, "Failed to delete the place");

    await session.commitTransaction();

    const deletedImage = await deleteImage(place.image);
    if (!deletedImage) console.error("Failed to delete image");

    res.status(200).json({ message: "Place deleted!" });
  } catch (error) {
    console.error(">>> deletePlace", error);
    next(error);
  }
};
