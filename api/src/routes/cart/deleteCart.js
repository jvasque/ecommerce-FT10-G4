const { OrderDetail } = require("../../db.js");
module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await OrderDetail.findOne({
      where: {
        productId: id,
      },
    });
    res.json(order);
    order.destroy();
  } catch (error) {
    console.log(error);
  }
};
