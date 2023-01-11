const express = require("express");
const getZoos = require("./utils/getZoos");
const app = express();
const validateZip = require("./middleware/validateZip");

app.get("/check/:zip", validateZip, (req, res, next) => {
  const zip = req.params.zip;
  if (getZoos(zip)) {
    res.send(`${zip} exists in our records.`);
  } else {
    res.send(`${zip} does not exist in our records.`);
  }
});

app.get("/zoos/:zip", validateZip, (req, res, next) => {
  const zip = req.params.zip;
  const zoos = getZoos(zip);
  if (zip === "all") {
    next();
  } else if (zoos.length > 1) {
    res.send(`${zip} zoos: ${zoos.join("; ")}`);
  } else if (zoos.length === 1) {
    res.send(`${zip} zoos: ${zoos}`);
  } else {
    res.send(`${zip} has no zoos.`);
  }
});

app.get("/zoos/all", (req, res, next) => {
  const zoos = getZoos();
  const admin = req.query.admin;
  console.log(admin);
  const response =
    !admin || admin.length !== 4
      ? `You do not have access to that route.`
      : `All zoos: ${zoos.join("; ")}`;
  res.send(response);
});

app.use((req, res, next) => {
  res.send(`That route could not be found!`);
});

app.use((err, req, res, next) => {
  res.send(err);
});

app.use(validateZip);

module.exports = app;