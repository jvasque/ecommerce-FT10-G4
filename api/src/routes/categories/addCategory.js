const { Category } = require("../../db.js");

module.exports = async (req, res, next) => {
  const { name } = req.body;
  const findDuplicate = await Category.findAll({
    where: {
      name: name,
    },
  });
  if (findDuplicate.length !== 0) {
    res.send("Ya existe esa categoria");
  } else {
    await Category.create({
      name: name,
    });
    res.send("Categoria Creada").status(200);
  }
};
