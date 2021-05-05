const { User } = require("../../db.js");
const { HandlerEmail } = require("./email/handlerEmail.js");
const { WelcomeEmail } = require("./email/WelcomeEmail");


module.exports = async (req, res) => {
    const  email  = req.user.email;
 
    const { suscribe, promotion, off, information } = req.body.news;
    if (
      typeof suscribe !== "boolean" ||
      typeof promotion !== "boolean" ||
      typeof information !== "boolean" ||
      typeof off !== "boolean"
    ){
      return res.status(400).json({ message: "bad request" });}
    const user = await User.findOne({where:{email: email}})
  
    
    if (!user)
      {return res.status(400).json({ message: "Usuario no encontrado" });}
    //send welcome email!
    if (
      (suscribe && !user.newsLetter) ||
      (promotion && !user.promotion) ||
      (off && !user.off) ||
      (information && !user.information)
    ) {
      await user.update({ newsLetter: suscribe });
      await user.update({ off: off });
      await user.update({ promotion: promotion });
      await user.update({ information: information });
      const html = WelcomeEmail();
      await HandlerEmail(html, user.email, "Bienvenido a nuestro NewsLetter");
      return res.json({ message: "Preferencias modificadas con exito" }); // para pruebas de postman
    } else if (
      (!suscribe && user.newsLetter) ||
      (!promotion && user.promotion) ||
      (!off && user.off) ||
      (!information && user.information)
    ) {
      await user.update({ newsLetter: suscribe });
      await user.update({ off: off });
      await user.update({ promotion: promotion });
      await user.update({ information: information });
      return res.json({message: "Ya no recibiras información sobre nosotros"}); // para pruebas de postman
    }
    return res.json({message:"El usuario no se esta actualizando!"});
  }