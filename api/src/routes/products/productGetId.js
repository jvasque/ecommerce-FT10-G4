const { Product, Category } = require("../../db.js");

module.exports = async (req, res, next) => {
  var code = req.params.id;
  var product = await Product.findOne({
    where: {
      productId: code,
    },
    include: {
      model: Category,
    },
  });
  if (product) {
    res.status(200);
    return res.json(product);
  } else {
    res.status(400);
    return res.json({ error: "that product cannot be find" });
  }
};
