const { Location } = require('../../db.js');
// /locations/locationPost
module.exports = async (req, res) => {
  const {
    address,
    country,
    province,
    city,
    postal,
    // latitud,
    // longitud,
  } = req.body;

  console.log(req.body);

  try {
    let data = await Location.create({
      label: 'Created',
      address,
      country,
      province,
      city,
      postal,
      // latitud,
      // longitud,
    });

    return res.json(data);
  } catch (err) {
    res.json(err);
    return console.log(err);
  }
};
