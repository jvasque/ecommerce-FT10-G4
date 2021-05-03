const { Product, OrderDetail, Review, Promotion } = require("../../db.js");

module.exports = async (req, res, next) => {
  try {
    let data = await Product.findAll({ include: {
      model: OrderDetail,
      include: Review
    }, include: [{
      model: Promotion,
      where: {
        active: true,
      },
      required: false 
    }]});
    return res.json(data);
  } catch (err) {
    res.json(err);
    return console.log(err);
  }
};
