const { Product, Category } = require("../../db.js");
module.exports = async (req, res) => {
  const { id, categoryId } = req.body;
  try {
    const product = await Product.findOne({
      where: {
        productId: id,
      },
      include: {
        model: Category,
      },
    });

    await product.setCategories([...product.categories, categoryId]);
    res.json("Category Added").status(200);
  } catch (error) {
    res.json(error);
  }
};
