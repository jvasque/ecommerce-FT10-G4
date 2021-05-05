const { User } = require("../../db.js");


module.exports=async (req, res) => {
    const code = req.user.id
    const user = await User.findByPk(code)
    const {newsLetter, promotion, off, information} = user
    res.send({newsLetter, promotion, off, information});
  }