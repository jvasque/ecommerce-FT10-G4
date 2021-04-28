const { Order, PaymentMethod } = require("../../db.js");

module.exports = async (req, res) => {
  try {
    let { state , paypal} = req.body;
    console.log(paypal)
let type=''
    if(paypal){
type='Paypal'
    }else{
      type='Mercadopago'
    }

    let order = await Order.findOne({
      where: {
        userId: req.params.id,
        state: "cart",
      },
    });

    let payment = await PaymentMethod.findOne({
      where: {
        type: type
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
