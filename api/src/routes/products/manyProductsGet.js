const Sequelize = require('sequelize');

// /products/filter

const { Product } = require('../../db.js');

module.exports = async (req, res, next) => {
  let { array } = req.body;

  try {
    let data = await Product.findAll({
      where: {
        id: { [Sequelize.Op.in]: array },
      },
    });

    return res.json(data);
  } catch (err) {
    res.json(err);
    return console.log(err);
  }
};
