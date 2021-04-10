const { Category } = require("../../db.js");
module.exports = async (req, res) => {
  let { newName, name } = req.body;

  let category = await Category.findOne({
    where: {
      name: name,
    },
  });

  category.name = newName;
  await category.save();

  console.log(req);
  res.send("PutCategory");
};
