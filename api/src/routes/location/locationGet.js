const { Location, UnitsOnLocation, Product } = require("../../db.js");

module.exports = async (req, res) => {
  try {
    let data = await Location.findAll({
      attributes: [
        "id",
        "label",
        "address",
        "street",
        "addressNumber",
        "province",
        "postal",
        "city",
        "country",
        "latitud",
        "longitud",
      ],
      include: {
        model: UnitsOnLocation,
        attributes: ["id", "unitsOnStock", "locationId"],
        include: [
          {
            model: Product,
            attributes: ["id", "name", "picture", "unitsOnStock"],
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
