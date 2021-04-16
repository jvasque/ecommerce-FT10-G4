const { User } = require("../../db.js");
const { Sequelize, Op } = require("sequelize");

module.exports = async (req, res) => {

  try {
    console.log(req.user)
    let {
      firstName,
      lastName,
      email,
      password,
    } = req.body.data;

    if (!firstName) {
      console.log("the user must have first name");
      return res.status(404).json({ error: "the user must have first name" });
    }
    if (!lastName) {
      console.log("the user must have last name");
      return res.status(404).json({ error: "the user must have last name" });
    }
    if (!email) {
      console.log("the user must have email");
      return res.status(404).json({ error: "the user must have email" });
    }
    if (!password) {
      console.log("the user must have password");
      return res.status(404).json({ error: "the user must have password" });
    }
    

    const find = await User.findOne({
      where: { email },
    });
    if (!find) {
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password,
    
      });
      //create a la order si no esta creada
      // si esta creada tienes que relacionar la orden con el usuario
      return res.json(newUser);
    } else {
      console.log("mail already exists");
      return res.status(404).json({ error: "mail already exists" });
    }
  } catch (err) {
    console.log(err);
    res.json({ error: "an error occurred while loading the data" });
  }
};
