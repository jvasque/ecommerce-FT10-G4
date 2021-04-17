const { Order } = require("../../db.js");

module.exports = async (req, res) => {

  try {
    let {      
      userId,
      firstName,
      lastName,
      state,
      paymentDate,
      totalPrice,
    } = req.body;

    let order = await Order.findOne({
      where: {
        id: parseInt(req.params.id),
      },
    });

  
    order.userId = userId;
    order.firstName = firstName;
    order.lastName = lastName;
    order.state= state;
    order.totalPrice = totalPrice;
    order.paymentDate = paymentDate;

    await order.save();

    
    res.send(order);
  } catch (error) {
    console.log('error', error)
    res.json(error.error);
  }
};
