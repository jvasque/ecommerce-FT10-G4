const nodemailer = require("nodemailer");
// const pug = require("pug");
const juice = require("juice");
const htmlToText = require("html-to-text");
const util = require("util");

//const emailConfig = require('../config');
//Posiblemente pasar a mailtrap

const { user, pass } = process.env;

let transporter = nodemailer.createTransport({
  service: "gmail",
  post: 587,
  secure: false,
  auth: {
    user,
    pass,
  },
});

const generarHTML = (firstName, secretNumber) => {
//   const html = pug.renderFile(
//     `${__dirname}/../views/emails/${archivo}.pug`,
//     opciones
//   );
  const html = `<html>
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
        <h1>Hola ${firstName}, hemos generado un codigo para que Ud.</h1>
        <h4>Ingrese este codigo ${secretNumber}</h4>
        </hr>
        <b>Este enlace dura 24 horas.</b>
      
        </hr>
        <b>Gracias por confiar en nosotros!</b>
        </div>
        </body>
        </html>
        `

  return juice(html);
};

//queda generica para ser utilizada desde cualquier parte de la aplicación

exports.DobleAuth = async (name, secret, email, subject, tipo) => {
  const html = generarHTML(name, secret);
//   const text = htmlToText.fromString(html); //deprecated

  let mailOptions = {
    from: "AgroPlace <agroplaceofficial@gmail.com>",
    to: email,
    subject: subject,
    html: html,
  };

  const enviarEmail = util.promisify(transporter.sendMail, transporter);
  return enviarEmail.call(transporter, mailOptions);
};
