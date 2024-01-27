const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();
const { MONGODB_URI } = process.env;

const placesRoutes = require("./routes/placesRoutes");
const usersRoutes = require("./routes/usersRoutes");
const errorsRoutes = require("./routes/errorsRoutes");

const app = express();
const port = 5000;

app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/places", placesRoutes);
app.use(errorsRoutes);

app.use((error, req, res, next) => {
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

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error(">>> Server & Mongoose Connect", error);
    throw error;
  }
})();
