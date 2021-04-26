
const { User } = require("../../db.js");

const jwt = require("jsonwebtoken");

const { SECRET_KEY} = process.env;

module.exports = async (req, res) => {
    const {password} = req.body
    const token = jwt.sign(req.user,SECRET_KEY)

   
    const user = await User.findByPk(req.user.id);
    if(!user) res.status(400).json({message: 'usuario no encontrado'})
    if(user.recoveryToken !== token) res.status(400).json({message: 'su token no es valido no sea tramposo'}) // borrar el token de la base de datos 
    if(user.passwordResetExpires < Date.now()) res.status(400).json({message: 'su token expiro!'}) // borrar token y reenviar mail
    if(user.resetPassword) {
      await user.update({password: password})
      await user.update({resetPassword: false})
      await user.update({recoveryToken : null});
      await user.update({passwordResetExpires : 0});
      await user.update({resetPassword: false});
    }
   
   

    return res.json(user);
    
  }