const { Router } = require("express");
const { Category } = require("../../db.js");

const allCategories = Router();

allCategories.get("/", async (req, res) => {
  await Category.create({
    name: "Fertilizante",
  });

  const data = await Category.findAll();
  res.json(data);
});

module.exports = allCategories;
