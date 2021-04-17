const { Order } = require("../../db.js");

module.exports = async (req, res, next) => {
  console.log(req.body)
  const {    
    userId,
    firstName,
    lastName,
    status,
    creationDate,
    paymentDate,
    totalPrice,
  } = req.body;

  try {
    const findDuplicate = await Order.findAll({
      where: {
        id:req.params.id,
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        status: status,
        creationDate: creationDate,
        paymentDate: paymentDate,
        totalPrice: totalPrice,
      },
    });
    if (findDuplicate.length !== 0) {
      res.send("Orden duplicada");
    } else {
      await Order.create({
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        status: status,
        creationDate: creationDate,
        paymentDate: paymentDate,
        totalPrice: totalPrice,
      });
      res.send("Orden Creada").status(200);
    }
  } catch (error) {
    res.json(error);
  }
};
