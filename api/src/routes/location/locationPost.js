const { Location, User } = require('../../db.js');

// /locations/

module.exports = async (req, res) => {
  const {
    latitud,
    longitud,
    ciudad,
    country,
    province,
    postal,
    address,
    street,
    addressNumber,
    userId,
  } = req.body;

  try {
    let location = await Location.create({
      label: Math.floor(Math.random() * 100000000),
      address,
      street,
      addressNumber,
      country,
      province,
      city: ciudad,
      postal,
      latitud,
      longitud,
    });

    let user = await User.findByPk(userId);

    location.setUser(user);

    return res.json(location);
  } catch (err) {
    res.json(err);
    return console.log(err);
  }
};
