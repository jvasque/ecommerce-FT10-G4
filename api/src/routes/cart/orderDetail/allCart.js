const { OrderDetail, Order } = require("../../../db.js");

module.exports = async (req, res) => {
  const { userId } = req.params;

  try {
    const order = await Order.findOne({
      where: {
        userId: userId,
        state: "cart",
      },
    });

    const ordersDetail = await OrderDetail.findAll({
      where: {
        orderId: order.id,
      },
    });
    ordersDetail ? res.json(ordersDetail) : res.send("Card Empty");
  } catch (error) {
    console.log(error);
  }
};
