const { Order ,User } = require("../../db.js");

module.exports = async (req, res, next) => {
  const {
    firstName,
    lastName,
    state,  
    paymentDate,
    totalPrice,
    email
  } = req.body;
 
  try {

    const user = await User.findOne({where:{email:email}})
  
    const orderCreate = await Order.findOrCreate({
      where: {
        //id: parseInt(req.params.id),
        firstName: firstName,
        lastName: lastName,
        state: state,       
        paymentDate: paymentDate || "pending",
        totalPrice: totalPrice,
      },
    });
    
      res.send(orderCreate).status(200);
    
  } catch (error) {
    console.log(error);
    res.json(error);
  }

}