const { User } = require("../../db.js");
const { Sequelize, Op } = require("sequelize");

module.exports = async (req, res) => {
  //errores:
  //mismo mail?
  // No le paso

  try {
    let {
      firstName,
      lastName,
      email,
      password,
      companyName,
      phone,
      address,
      city,
    } = req.body;
    if(!firstName) return res.status(404).send("debe tener nombre");
    if(!lastName) return res.status(404).send("debe tener apellido");
    if(!password) return res.status(404).send("debe tener password");
    const find = await User.findOne({
      where: { email },
    });
    if (!find) {
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password,
        companyName,
        phone,
        address,
        city,
      });
      return res.json(newUser);
    } else return res.status(404).send("mail ya existe");
  } catch (err) {
    console.log(err);
    res.json({ error: "an error occurred while loading the data" });
  }
};
