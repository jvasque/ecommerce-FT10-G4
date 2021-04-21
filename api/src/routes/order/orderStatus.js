const { Order, PaymentMethod } = require("../../db.js");

module.exports = async (req, res) => {
  try {
    let { state } = req.body;

    let order = await Order.findOne({
      where: {
        userId: req.params.id,
        state: "cart",
      },
    });

    let payment = await PaymentMethod.findOne({
      where: {
        type: 'Mercadopago'
      }
    }) 

    order.state = state;
    await order.save();

    order.setPaymentMethod(payment)

    res.send(order);
  } catch (error) {
    console.log("error", error);
    res.json(error.error);
  }
};
