const express = require("express");

const { PLACES, USERS } = require("../DUMMY_DATA");
const { throwError } = require("../helpers/errorHandler");

const router = express.Router();

router.get("/user/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;

    const user = USERS.find((u) => u.id === uid);
    if (!user) throwError(404, "User not found.");

    const places = PLACES.filter((p) => p.creator === user.id);
    if (places.length === 0) throwError(404, "No places for this user.");

    res.status(200).json({ places });
  } catch (error) {
    console.error(">>> /user/:uid route", error);
    next(error);
  }
});

router.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;

    const place = PLACES.find((p) => p.id === pid);
    if (!place) throwError(404, "Could not find a place for the provided id.");

    res.status(200).json({ place });
  } catch (error) {
    console.error(">>> /:pid route", error);
    next(error);
  }
});

module.exports = router;
