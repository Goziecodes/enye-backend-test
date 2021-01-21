const express = require("express");
const fetch = require("node-fetch");
const app = express();

const port = 4000;

app.get("/", (req, res) => {
  res.send("welcome to home");
});

app.get("/api/rates/:base", (req, res) => {
  const base = req.params.base;
  const currency = Array.from(req.query.name.split(","));

  fetch(
    `https://api.exchangeratesapi.io/latest?base=${base}&symbols${currency}`
  )
    // .then((data) => JSON.parse(data))
    .then((data) => data.json())
    .then((data) => console.log(data));

  res.send("welcome to home");
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
