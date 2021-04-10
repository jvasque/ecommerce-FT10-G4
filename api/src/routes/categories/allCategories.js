const { Router } = require("express");
const { Category } = require("../../db.js");

const allCategories = Router();

allCategories.get("/", async (req, res) => {
  const data = await Category.findAll({include: {all: true}});
  res.json(data);
});

module.exports = allCategories;
