const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

if (process.env.NODE_ENV === "development") {
  const envPath = ".env.development";
  require("dotenv").config({ path: envPath });
}
const { MONGODB_URI, COOKIE_PARSER_PASS, PORT } = process.env;

const placesRoutes = require("./routes/placesRoutes");
const usersRoutes = require("./routes/usersRoutes");
const errorsRoutes = require("./routes/errorsRoutes");

const { deleteImage } = require("./utils/deleteImage");

const app = express();

app.use(express.json());
app.use(
  "/uploads/images",
  express.static(path.join(__dirname, "uploads", "images"))
);

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
    const deletedImage = await deleteImage(req.file.path);
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
