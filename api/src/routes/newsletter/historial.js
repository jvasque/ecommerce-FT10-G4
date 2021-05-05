

const {
  User,
  Newsletter,
} = require("../../db.js");


module.exports = async (req, res) => {

    const news = await Newsletter.findAll({ include: { model: User } });
    if(!news) return res.status(400).json({message: "no existe historial"})
    return res.status(200).json(news);
  }