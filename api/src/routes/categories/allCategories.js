const { Category, Product, Promotion, SubCategory } = require("../../db.js");

module.exports = async (req, res) => {
  const data = await Category.findAll({
    include: SubCategory,
    include: {
      model: Product,
      include: {
        model: Promotion,
        where:{
          active: true
        },
        required: false
      }
    }
  });
  res.json(data);
};
