const { Category } = require("../../db.js");

module.exports = async (req, res) => {
  const { name } = req.body;
  try {
    await Category.destroy({
      where: {
        name: name,
      },
    });
    res.send("DELETED");
  } catch (error) {
    res.json(error);
  }
};
