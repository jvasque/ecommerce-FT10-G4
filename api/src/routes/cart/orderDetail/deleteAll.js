const { OrderDetail, Order } = require("../../../db");

module.exports = async (req, res) => {
  const { userId } = req.params;

  try {
    const order = await Order.findOne({
      where: {
        userId: userId,
      },
    });
    const orderDetails = await OrderDetail.findAll({
      where: {
        orderId: order.id,
      },
    });

    for (let i = 0; i < orderDetails.length; i++) {
      await orderDetails[i].destroy();
    }
    res.send("Deleted");
  } catch (error) {
    console.log(error);
  }
};
