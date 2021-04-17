const { User } = require("../../db.js");
const { Sequelize, Op } = require("sequelize");

module.exports = async (req, res) => {
  try {
    console.log(req.query.email)
      let email = req.query.email
    if (!email) {
      console.log("the user must have email");
      return res.status(404).json({ error: "the user must have email" });
    }

    const find = await User.findOne({
      where: { email },
    });
    // includes de order
    if (!find) {
      console.log("mail already exists");
      return res.status(404).json({ error: "mail already exists" });
    } else {
        
      return res.status(200).json(find);
    }
  } catch (err) {
    console.log(err);
    res.json({ error: "an error occurred while loading the data" });
  }

};
