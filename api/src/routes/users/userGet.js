const { User, Product, Order, OrderDetail } = require("../../db.js");

module.exports = async (req, res) => {
  try {
    let data = await User.findAll({ include: {
      model: Order,
      include: [{
          model: OrderDetail,
          include: Product
      }]
    },});
    return res.json(data);
  } catch (err) {
    res.json(err);
    return console.log(err);
  }
};
