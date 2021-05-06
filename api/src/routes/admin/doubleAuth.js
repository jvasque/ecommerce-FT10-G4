
const {
  User,

} = require("../../db");

const {
  SECRET_KEY,
  
} = process.env;
const jwt = require("jsonwebtoken");


module.exports = async (req, res) => {
    const admin = req.user;
    const { secretNumber } = req.body;
    const user = await User.findByPk(admin.id);
    if (user.secretCodeExpires > Date.now()) {
      if (user.secretCode === secretNumber) {
        
        await user.update({ secretCode: null });
        await user.update({ secretCodeExpires: null });
        const token = jwt.sign(user.toJSON(), SECRET_KEY)

        res.send(token); 
      } else {
        await user.update({ secretCode: null });
        await user.update({ secretCodeExpires: null });
        res.status(400).json({ message: "Debe volver a solicitar el codigo" });
      }
    } else {
      await user.update({ secretCode: null });
      await user.update({ secretCodeExpires: null });
      res.status(400).json({ message: "Debe volver a solicitar el codigo" });
    }
    
  }