let { PLACES, USERS } = require("../DUMMY_DATA");
const { throwError } = require("../helpers/errorHandler");
const { validationErrorHandler } = require("../helpers/validationErrorHandler");
const getCoordsForAddress = require("../utils/location");

exports.getPlaceById = async (req, res, next) => {
  try {
    const { pid } = req.params;

    const place = PLACES.find((p) => p.id === pid);
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

    const user = USERS.find((u) => u.id === uid);
    if (!user) throwError(404, "User not found.");

    const places = PLACES.filter((p) => p.creator === uid);

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

    const createdPlace = {
      id: Date.now().toString(),
      title,
      description,
      image,
      location,
      address,
      creator,
    };

    PLACES.push(createdPlace);

    res
      .status(201)
      .json({ message: "New place created!", place: createdPlace });
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

    const place = PLACES.find((p) => p.id === pid);
    if (!place) throwError(404, "Could not find a place for the provided id.");

    const updatedPlace = {
      ...place,
      title,
      description,
    };

    const placeIndex = PLACES.findIndex((p) => p.id === pid);
    PLACES[placeIndex] = updatedPlace;

    res.status(200).json({ message: "Place updated!", place: updatedPlace });
  } catch (error) {
    console.error(">>> updatePlace", error);
    next(error);
  }
};

exports.deletePlace = async (req, res, next) => {
  try {
    const { pid } = req.params;

    const place = PLACES.find((p) => p.id === pid);
    if (!place) throwError(404, "Could not find a place for the provided id.");

    PLACES = PLACES.filter((p) => p.id !== pid);

    res.status(200).json({ message: "Place deleted!" });
  } catch (error) {
    console.error(">>> deletePlace", error);
    next(error);
  }
};
