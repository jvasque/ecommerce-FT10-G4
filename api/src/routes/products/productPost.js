const { Product, Category } = require('../../db.js');
const { Sequelize, Op } = require('sequelize');

module.exports = async (req, res) => {
  let {
    name,
    SKU,
    unitPrice,
    description,
    picture,
    categoryCheck,
    unitsOnStock,
  } = req.body.params;

  if(unitPrice < 0 ) return res.json({ error: 'unitPrice cannot be negative' })
  if(unitsOnStock < 0) return res.json({ error: 'unitsOnStock cannot be negative' })

  try {
    const [addProduct, created] = await Product.findOrCreate({
      where: {
        name,
        SKU,
        unitPrice,
        description,
        picture,
        unitsOnStock,
      },
    });

    const findCategories = await Category.findAll({
      where: {
        name: {
          [Op.in]: categoryCheck,
        },
      },
    });

    await addProduct.setCategories(findCategories);

    return res.json(addProduct);
  } catch (err) {
    console.log(err);
    res.json({ error: 'an error occurred while loading the data' });
  }
};
