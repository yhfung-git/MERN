const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

app.post("/products");

app.get("/products");

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
