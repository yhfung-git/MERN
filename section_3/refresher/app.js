const express = require("express");

const app = express();
const port = 5000;

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  const form =
    "<form action='/user' method='POST'><input type='text' name='username' ><button type='submit'>Create User</button></form>";
  res.send(form);
});

app.post("/user", (req, res, next) => {
  const { username } = req.body;
  return res.send(`<h1>User: ${username}</h1>`);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
