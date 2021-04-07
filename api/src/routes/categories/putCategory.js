const { Router } = require("express");

const putCategory = Router();

putCategory.get("/", (req, res) => {
  res.send("PutCategory");
});

module.exports = putCategory;
