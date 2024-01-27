const express = require("express");

const { createProduct, getProduct } = require("./productsControllers");

const app = express();
const port = 3000;

app.use(express.json());

app.post("/products", createProduct);

app.get("/products", getProduct);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
