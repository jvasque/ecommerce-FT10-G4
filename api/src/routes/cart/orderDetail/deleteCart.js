const { OrderDetail, Order } = require("../../../db");
module.exports = async (req, res) => {
  const { id, userId } = req.params;

  try {
    const order = await Order.findOne({
      where: {
        userId: userId,
        state: "cart",
      },
    });

    const orderDetail = await OrderDetail.findOne({
      where: {
        productId: id,
        orderId: order.id,
      },
    });
    res.json(orderDetail);
    orderDetail.destroy();
  } catch (error) {
    console.log(error);
  }
};
