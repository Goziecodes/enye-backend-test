const express = require("express");
const app = express();

const port = 4000;

app.get("/", (req, res) => {
  res.send("welcome to home");
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
