const { Product, OrderDetail, Review } = require("../../db.js");

module.exports = async (req, res, next) => {
  try {
    let data = await Product.findAll({ include: {
      model: OrderDetail,
      include: Review
    },});
    return res.json(data);
  } catch (err) {
    res.json(err);
    return console.log(err);
  }
};
