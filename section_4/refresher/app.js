const express = require("express");

const { mongoConnect } = require("./database");
const { createProduct, getProduct } = require("./productsControllers");

const app = express();
const port = 3000;

app.use(express.json());

app.post("/products", createProduct);

app.get("/products", getProduct);

(async () => {
  try {
    await mongoConnect();
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
})();
