const { Product, OrderDetail, Review, Promotion } = require("../../db.js");

module.exports = async (req, res, next) => {
  try {
    let data = await Product.findAll({
      include: [
        {
          model: Promotion,
          where: {
            active: true,
          },
          required: false,
        },
        {
          model: OrderDetail,
          include: Review,
        },
      ],
    });
    return res.json(data);
  } catch (err) {
    res.json(err);
    return console.log(err);
  }
};
