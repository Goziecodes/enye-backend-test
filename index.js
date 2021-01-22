const { response } = require("express");
const express = require("express");
const fetch = require("node-fetch");
const axios = require("axios");
const app = express();

const port = 4000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/api/rates", (req, res) => {
  const base = req.query.base;

  // here i handled an error breaking my app when a user enters only one currency and currency.split fails.
  // using conditional statement to split only if there is a comma in the query parameter
  const currency = req.query.currency.includes(",")
    ? Array.from(req.query.currency.split(","))
    : req.query.currency;

  axios
    .get(
      `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${currency}`
    )
    .then((resp) => {
      const response = resp.data;
      console.log(response);
      const formatResult = {
        results: {
          base: response.base,
          date: response.date,
          rates: {
            ...response.rates,
          },
        },
      };
      res.send(formatResult);
      // return formatResult;
    })
    .catch((err) => {
      // console.log(err.response.status, "oooooo");
      // console.log(err.response.data);
      console.log(err.response.status);
      const errorResponse = {
        status: err.response.status,
        message: err.response.data.error,
      };
      res.send(errorResponse);
    });
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
