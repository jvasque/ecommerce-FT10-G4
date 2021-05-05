const { Location, Product, UnitsOnLocation } = require("../../db.js");

module.exports = async (req, res) => {
  const id = req.params.id;

  const { productId, stock } = req.body;

  try {
    const UOL = await UnitsOnLocation.findOne({
      where: {
        productId: productId,
        locationId: id,
      },
    });
    if (UOL) {
      if (stock) {
        UOL.unitsOnStock = stock;
        await UOL.save();
      }
    }

    let productUnitsAll = await UnitsOnLocation.findAll({
      where: {
        productId: productId,
      }
    })

    let newStock = await productUnitsAll.reduce((a,b) => a+b.dataValues.unitsOnStock, 0)
    
    let productToSetStock = await Product.findByPk(productId);

    productToSetStock.unitsOnStock = newStock;
    await productToSetStock.save();
    
    return res.json(UOL);
  } catch (err) {
    res.json(err);
    return console.log(err);
  }
};
