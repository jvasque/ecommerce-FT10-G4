const { Router } = require("express");
const { Category } = require("../../db.js");

const allCategories = Router();

allCategories.get("/", async (req, res) => {
  const data = await Category.findAll();
  res.json(data);
});

module.exports = allCategories;
