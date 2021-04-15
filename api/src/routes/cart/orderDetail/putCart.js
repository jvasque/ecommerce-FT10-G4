const { OrderDetail, Order } = require("../../../db");

module.exports = async (req, res) => {
  const { userId, id, quantity } = req.body;
  try {
    const order = await Order.findOne({
      where: {
        userId: userId,
      },
    });

    let orderDetail = await OrderDetail.findOne({
      where: {
        productId: id,
        orderId: order.id,
      },
    });

    orderDetail.quantity = quantity;
    await orderDetail.save();

    res.json(orderDetail);
  } catch (error) {
    res.json(error);
  }
};
