const { Location, UnitsOnLocation, Product } = require("../../db.js");

module.exports = async (req, res) => {
  try {
    let data = await Location.findOne({
      where: { id: req.params.id },      
      include: {
        model: UnitsOnLocation,
        attributes: ["unitsOnStock"],
        include: [
          {
            model: Product,
            attributes: ["id", "unitsOnStock"],
          },
        ],
      },
    });
    return res.json(data);
  } catch (err) {
    res.json(err);
    return console.log(err);
  }
};
