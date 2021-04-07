const { Router } = require("express");

const deleteCategory = Router();

deleteCategory.get("/", (req, res) => {
  res.send("DELETE");
});

module.exports = deleteCategory;
