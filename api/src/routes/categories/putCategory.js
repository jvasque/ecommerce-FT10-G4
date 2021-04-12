const { Category } = require("../../db.js");
module.exports = async (req, res) => {
  try {
    let { newName, name } = req.body;
    console.log(newName);
    let category = await Category.findOne({
      where: {
        name: name,
      },
    });

    category.name = newName;
    await category.save();

    res.send("PutCategory");
  } catch (error) {
    res.json(error);
  }
};
