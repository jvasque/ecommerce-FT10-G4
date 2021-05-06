const { Location, Product, UnitsOnLocation } = require('../../db.js');

module.exports = async (req, res) => {
  const id = req.params.id;
  console.log(id);

  const {
    productId
  } = req.body;

  try {
    let location = await Location.findByPk(id)
    const prod = await Product.findByPk(productId)
    const seteo = await UnitsOnLocation.findOrCreate({
        where: {
          unitsOnStock: 0,
          productId: productId,
          locationId: id
        },
      });
      const UOL = await UnitsOnLocation.findOne({
        where: {
          unitsOnStock: 0,
          productId: productId,
          locationId: id
        },
      });
    await location.addUnitsOnLocations(UOL)
    await prod.addUnitsOnLocations(UOL)

    return res.json(location);
  } catch (err) {
    res.json(err);
    return console.log(err);
  }
};