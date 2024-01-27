const express = require("express");

// const { mongoConnect } = require("./utils/database");
const mongoose = require("mongoose");
require("dotenv").config();
const { MONGODB_URI } = process.env;

const {
  createProduct,
  getProducts,
} = require("./controllers/productsControllers");

const app = express();
const port = 3000;

app.use(express.json());

app.post("/products", createProduct);

app.get("/products", getProducts);

(async () => {
  try {
    await mongoose.connect(MONGODB_URI);

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
})();
