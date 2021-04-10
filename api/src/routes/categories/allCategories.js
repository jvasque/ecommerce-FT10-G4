const { Category } = require("../../db.js");

module.exports = async (req, res) => {
  const data = await Category.findAll();
  res.json(data);
};
