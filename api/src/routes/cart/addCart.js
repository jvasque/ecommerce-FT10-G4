const { OrderDetail } = require("../../db.js");

module.exports = async (req, res, next) => {
  const { productId } = req.body;

  try {
    const findDuplicate = await OrderDetail.findAll({
      where: {
        productId: productId,
        quantity: 1,
      },
    });
    if (findDuplicate.length !== 0) {
      res.send("Ya existe ese producto");
    } else {
      await OrderDetail.create({
        productId: productId,
        quantity: 1,
      });
      res.send("Producto Creado").status(200);
    }
  } catch (error) {
    res.json(error);
  }
};
