const { Router } = require("express");
const { Category } = require("../../db.js");

const deleteCategory = Router();

deleteCategory.post("/", async (req, res) => {
  const { name } = req.body;
  await Category.destroy({
    where: {
      name: name,
    },
  });
  res.send("DELETED");
});

module.exports = deleteCategory;
