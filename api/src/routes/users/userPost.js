const { User } = require('../../db.js');
const { Sequelize, Op } = require('sequelize');

module.exports = async (req, res) => {
    //tipo por defecto es user
    //numero string o int?
    //Yo no tengo que enviar id's
  let {
    firstName,
    lastName,
    email,
    password,
    companyName,
    phone,
    address,
    city
  } = req.body;
  try {
    const newUser = await User.findOrCreate({
      where: {
        firstName,
        lastName,
        email,
        password,
        companyName,
        phone,
        address,
        city
      },
    });
    return res.json(newUser);
  } catch (err) {
    console.log(err);
    res.json({ error: 'an error occurred while loading the data' });
  }
};
