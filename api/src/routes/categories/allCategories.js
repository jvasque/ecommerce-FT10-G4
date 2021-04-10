const { Category } = require("../../db.js");

module.exports = async (req, res) => {
  const data = await Category.findAll({include: {all: true}});
  res.json(data);
};
