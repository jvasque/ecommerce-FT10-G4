const add = require("express").Router();
const { Product } = require("../../db.js");

add.get("/", (req, res, next) => {
  res.send("Add Category");
});

module.exports = add;
