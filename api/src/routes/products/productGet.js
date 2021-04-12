const { Product, Category } = require("../../db.js");

module.exports = async (req, res, next) => {
  try {
    let data = await Product.findAll({
      include: {
        model: Category,
      },
    });
    return res.json(data);
  } catch (err) {
    res.json(err);
    return console.log(err);
  }
};
