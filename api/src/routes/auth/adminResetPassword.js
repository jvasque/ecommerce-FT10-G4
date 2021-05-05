const { User } = require("../../db.js");

const jwt = require("jsonwebtoken");

const { SECRET_KEY, user, pass } = process.env;
const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
 
  const id = req.params.id;
  const usuario = await User.findByPk(id);
  if (!usuario) res.status(404).json({ message: "Usuario no encontrado" });

 

  if (req.user.type.includes( "admin")) {
    const token = jwt.sign({ id: usuario.toJSON().id }, SECRET_KEY);
    await usuario.update({ recoveryToken: token });
    await usuario.update({
      passwordResetExpires: parseInt(Date.now() + 24 * 60 * 60 * 1000),
    });
    await usuario.update({ resetPassword: true });

    let transporter = nodemailer.createTransport({
      service: "Gmail",
      post: 587,
      secure: false,
      auth: {
        user: user,
        pass: pass,
      },
    });

    let htmlCreator = `
    <html>
    <head>
    <style type="text/css">
    .containergral {
        align-content: center;
        justify-content: center;
        padding: 30px;
        position: relative;
        background: #EFEFEF;
        }
    h1 {
        color: #378A19;
    }
    .unorderlist {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background: #F7F7F7;
        color: #378A19;
      }
    .img-card {
        margin-left: 25%;
        margin-top: 20px    
    }
    </style>
    </head>
    <body>
    <div class="containergral">
    <h1>Hola ${usuario.firstName}, hemos generado un link para que reestablescas tu contraseña</h1>
    <a href="http://localhost:3000/reset/password/${token}" target="_blank" rel="noopener noreferrer">haga click aqui</a>
    </hr>
    <b>Este enlace dura 24 horas.</b>
  
    </hr>
    <b>Gracias por confiar en nosotros!</b>
    </div>
    </body>
    </html>
    `;
   
    // console.log(typeof htmlCreator)
    let mailOptions = {
      from: "AgroPlace <agroplaceofficial@gmail.com>",
      to: usuario.email,
      subject: `cambio de contraseña, usuario: ${usuario.firstName}`,
      html: htmlCreator,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return res.status(500).send(error.message);

      res.status(200).json({ answer: req.body });
    });

    // res.json({ token, User }); //para postman
  } else {
    res.status(401).json({ message: "No autorizado" });
  }
};
