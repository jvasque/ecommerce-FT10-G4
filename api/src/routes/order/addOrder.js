const { Order } = require("../../db.js");

module.exports = async (req, res, next) => {
  const {
    firstName,
    lastName,
    state,  
    paymentDate,
    totalPrice,
  } = req.body;
  console.log(req.params.id);
  try {
    const orderCreate = await Order.findOrCreate({
      where: {
        id: parseInt(req.params.id),
        firstName: firstName,
        lastName: lastName,
        state: state,       
        paymentDate: paymentDate,
        totalPrice: totalPrice,
      },
    });
    
      res.send(orderCreate).status(200);
    
  } catch (error) {
    console.log(error);
    res.json(error);
  }

}