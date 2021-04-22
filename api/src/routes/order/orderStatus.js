const { Order } = require("../../db.js");

module.exports = async (req, res) => {
  try {
    let { state } = req.body;

    let order = await Order.findOne({
      where: {
        userId: req.params.id,
        state: "cart",
      },
    });

    order.state = state;
    await order.save();

    res.send(order);
  } catch (error) {
    console.log("error", error);
    res.json(error.error);
  }
};
