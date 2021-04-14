const { OrderDetail } = require("../../db.js");

module.exports = async (req, res, next) => {
  const { productId, quantity } = req.body;
 
  try {
    const findDuplicate = await OrderDetail.findAll({
      where: {
        name: name,
      },
    });
    if (findDuplicate.length !== 0) {
      res.send("Ya existe esa categoria");
    } else {
      await OrderDetail.create({
        name: name,
      });
      res.send("Orden Creada").status(200);
    }
  } catch (error) {
    res.json(error);
  }
};
