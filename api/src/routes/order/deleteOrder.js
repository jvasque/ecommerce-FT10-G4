const { Order } = require("../../db.js");

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findOne({
      where: {
        id: id,
      },
    });
    res.json(order);
    order.destroy();
  } catch (error) {
    console.log(error);
  }
};
