const { Order } = require("../../db.js");

module.exports = async (req, res) => {

  try {
    let {      
      address,
      firstName,
      lastName,
      state,
      paymentDate,
      totalPrice,
      phoneNumber
    } = req.body; 

    let order = await Order.findOne({
      where: {
        id: parseInt(req.params.id),
      },
    });
  
  
    order.firstName = firstName;
    order.lastName = lastName;
    order.state= state;
    order.phoneNumber= phoneNumber;
    order.totalPrice = totalPrice;
    order.paymentDate = paymentDate;
    order.address = address
    await order.save();

    
    res.send(order);
  } catch (error) {
    console.log('error', error)
    res.json(error.error);
  }
};
