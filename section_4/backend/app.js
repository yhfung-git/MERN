const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;

if (process.env.NODE_ENV === "development") {
  const envPath = ".env.development";
  require("dotenv").config({ path: envPath });
}
const { MONGODB_URI, COOKIE_PARSER_PASS, PORT } = process.env;

const placesRoutes = require("./routes/placesRoutes");
const usersRoutes = require("./routes/usersRoutes");
const errorsRoutes = require("./routes/errorsRoutes");

const { extractImageId } = require("./middlewares/fileUpload");

const app = express();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",
  "https://mern-places-925fa.web.app",
];
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(cookieParser(COOKIE_PARSER_PASS));

app.use("/api/users", usersRoutes);
app.use("/api/places", placesRoutes);
app.use(errorsRoutes);

app.use(async (error, req, res, next) => {
  if (req.file) {
    const imageId = await extractImageId(req.file);
    const deletedImage = await cloudinary.uploader.destroy(imageId);
    if (!deletedImage) console.error("Failed to delete image");
  }

  if (res.headersSent) {
    console.error(">>> error-handling middleware", error);
    return next(error);
  }

  const statusCode = error.statusCode || 500;
  const errorMessage = error.message || "An unknown error occurred!";
  res.status(statusCode).json({ message: errorMessage });
});

(async () => {
  try {
    await mongoose.connect(MONGODB_URI);

    app.listen(PORT || 5000, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error(">>> Server & Mongoose Connect", error);
    throw error;
  }
})();
