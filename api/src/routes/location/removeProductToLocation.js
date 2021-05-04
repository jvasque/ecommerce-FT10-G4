const { Location, Product, UnitsOnLocation } = require("../../db.js");

module.exports = async (req, res) => {
  const id = req.params.id;

  const { productId } = req.body;

  try {
    let location = await Location.findByPk(id);
    const prod = await Product.findByPk(productId);

    const UOL = await UnitsOnLocation.findOne({
      where: {
        productId: productId,
        locationId: id,
      },
    });

    if (!UOL) return res.json({ error: "Can't find that product in this location" });

    await UOL.destroy()
    /* await location.removeUnitsOnLocations(UOL);
    await prod.removeUnitsOnLocations(UOL); */

    return res.json(location);
  } catch (err) {
    res.json(err);
    return console.log(err);
  }
};
