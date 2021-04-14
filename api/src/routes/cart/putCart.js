const { OrderDetail } = require("../../db.js");

module.exports = async (req, res) => {
  try {
    let { quantity, productId } = req.body;
    console.log(productId);

    let orderDetail = await OrderDetail.findOne({
      where: {
        productId: productId,
      },
    });

    orderDetail.quantity = quantity;
    await orderDetail.save();

    res.send("Modified Order detail");
  } catch (error) {
    res.json(error);
  }
};
