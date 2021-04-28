const { Location, UnitsOnLocation, Product } = require('../../db.js');
// /locations/locationPost
module.exports = async (req, res) => {
  try {
    let data = await Location.findAll({
        attributes: ['id','label', 'address', 'province', 'postal', 'city', 'country', 'latitud', 'longitud'],
        include: {
            model: UnitsOnLocation,
            attributes: ['id', 'unitsOnStock'],
            include: [
            {
                model: Product,
                attributes: ['id','name', 'picture', 'unitsOnStock'],
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
