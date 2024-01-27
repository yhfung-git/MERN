const axios = require("axios");

const { throwError } = require("../helpers/errorHandler");

const getCoordsForAddress = async (address) => {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      address
    )}&format=json&addressdetails=1&limit=1`;

    const response = await axios.get(url);
    const data = response.data;
    if (!data) throwError(404, "Location not found for the provided address");

    const coordinates = { lat: data[0].lat, lng: data[0].lon };
    return coordinates;
  } catch (error) {
    console.error(">>> getCoordsForAddress", error);
    throw error;
  }
};

module.exports = getCoordsForAddress;
