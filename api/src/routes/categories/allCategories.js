const { Router } = require("express");

const allCategories = Router();

allCategories.get("/", (req, res) => {
  res.send("all Categories");
});

module.exports = allCategories;
