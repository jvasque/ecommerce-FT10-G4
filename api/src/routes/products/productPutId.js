const { Product, Category } = require("../../db.js");

module.exports = async (req, res, next) => {
  let {
    name,
    SKU,
    unitPrice,
    description,
    unitsOnStock,
    picture,
    categoriesIds,
  } = req.body.params;
  let code = req.params.id;

  if (unitPrice < 0) return res.json({ error: "unitPrice cannot be negative" });
  if (unitsOnStock < 0)
    return res.json({ error: "unitsOnStock cannot be negative" });

  const product = await Product.findOne({
    where: {
      id: code,
    },
  });
  if (product) {
    if (name) await product.update({ name: name });
    if (SKU) await product.update({ SKU: SKU });
    if (unitPrice) await product.update({ unitPrice: unitPrice });
    if (description) await product.update({ description: description });
    if (unitsOnStock) await product.update({ unitsOnStock: unitsOnStock });
    if (picture) await product.update({ picture: picture });

    if (categoriesIds) {
      product.setCategories(categoriesIds);
    }

    res.status(200);
    return res.json(product);
  } else {
    res.status(400);
    return res.json({ error: "that product cannot be find" });
  }
};
