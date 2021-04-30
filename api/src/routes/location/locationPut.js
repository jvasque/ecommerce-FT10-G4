const { Location } = require('../../db.js');

module.exports = async (req, res) => {
  const id = req.params.id;
  console.log(id);

  const {
    label,
    address,
    street,
    addressNumber,
    ciudad,
    country,
    province,
    postal,
    latitud,
    longitud,
  } = req.body;

  try {
    let location = await Location.findOne({
      where: {
        id: id,
      },
    });

    location.update({
      label,
      address,
      street,
      addressNumber,
      city: ciudad,
      country,
      province,
      postal,
      latitud,
      longitud,
    });

    console.log(location);

    return res.json(location);
  } catch (err) {
    res.json(err);
    return console.log(err);
  }
};
