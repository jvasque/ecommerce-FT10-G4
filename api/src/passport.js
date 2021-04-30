const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const { User } = require("./db.js");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const {
  SECRET_KEY,
  CLIENT_SECRET_FB,
  CLIENT_ID_FB,
  CALLBACK_URL_FB,
  user, pass
} = process.env;
const enviarEmail = require("./routes/newsletter/email");

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password", session: false },
    async (email, password, done) => {
      const usuario = await User.findOne({ where: { email: email } });
      if (!usuario || !usuario.correctPassword(password)) return done(null, false);
      if (usuario.resetPassword) return done(null, false);
      const {
        id,
        firstName,
        lastName,
        email: userEmail,
        photoURL,
        phone,
        adress,
        type,
        status,
      } = usuario;

      if (type.includes("admin")) {
        let arr = [];
        let secretNumber;
        for (let i = 0; i < 6; i++) {
          let numero = Math.floor(Math.random() * 10);
          arr.push(numero);
        }
        secretNumber = arr.join("");
        await usuario.update({ secretCode: secretNumber });
        await usuario.update({ secretCodeExpires: Date.now() + 15 * 60 * 1000 });
        // mandar el codigo 
        const enviar = await enviarEmail.enviar(usuario.firstName, secretNumber, usuario.email, `cambio de contraseña, usuario: ${usuario.firstName}`)
        // let transporter = nodemailer.createTransport({
        //   service: "Gmail",
        //   post: 587,
        //   secure: false,
        //   auth: {
        //     user: user,
        //     pass: pass,
        //   },
        // });
    
        // let htmlCreator = `<html>
        // <head>
        // <style type="text/css">
        // .containergral {
        //     align-content: center;
        //     justify-content: center;
        //     padding: 30px;
        //     position: relative;
        //     background: #EFEFEF;
        //     }
        // h1 {
        //     color: #378A19;
        // }
        // .unorderlist {
        //     display: flex;
        //     flex-direction: row;
        //     align-items: center;
        //     justify-content: center;
        //     background: #F7F7F7;
        //     color: #378A19;
        //   }
        // .img-card {
        //     margin-left: 25%;
        //     margin-top: 20px    
        // }
        // </style>
        // </head>
        // <body>
        // <div class="containergral">
        // <h1>Hola ${usuario.firstName}, hemos generado un codigo para que Ud.</h1>
        // <h4>Ingrese este codigo ${secretNumber}</h4>
        // </hr>
        // <b>Este enlace dura 24 horas.</b>
      
        // </hr>
        // <b>Gracias por confiar en nosotros!</b>
        // </div>
        // </body>
        // </html>
        // `;
       
        // // console.log(typeof htmlCreator)
        // let mailOptions = {
        //   from: "AgroPlace <agroplaceofficial@gmail.com>",
        //   to: usuario.email,
        //   subject: `cambio de contraseña, usuario: ${usuario.firstName}`,
        //   html: htmlCreator,
        // };
    
        // transporter.sendMail(mailOptions, (error, info) => {
        //   if (error) return res.status(500).send(error.message);
    
        //   res.status(200).json({ answer: req.body });
        // });
      }

      if (status === "disabled") return done(null, false);
      if (status === "banned") return done(null, false);
      return done(null, {
        id,
        firstName,
        lastName,
        email: userEmail,
        photoURL,
        phone,
        adress,
        type,
        status,
      });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: CLIENT_ID_FB,
      clientSecret: CLIENT_SECRET_FB,
      callbackURL: CALLBACK_URL_FB,
      profileFields: ["email", "name"],
    },

    //     function (accessToken, refreshToken, profile, done) {
    //       console.log(profile);
    //       User.findOne(
    //         { where: { facebookUser: profile.id } },
    //         function (err, oldUser) {
    //           if (oldUser) {
    //             done(null, oldUser);
    //           } else {
    //             var newUser = new User({
    //               facebookUser: profile.id,
    //               email: profile.emails[0].value,
    //               type: 'user',
    //               firstName: profile.name.givenName,
    //               lastName: profile.name.familyName,
    //               password: 'Default@12#$',
    //             }).save(function (err, newUser) {
    //               if (err) throw err;
    //               done(null, newUser);
    //             });
    //           }
    //         }
    //       );
    //     }
    //   )
    // );
    async function (accessToken, refreshToken, profile, done) {
      console.log(profile);

      const newUser = await User.findOrCreate({
        where: {
          facebookUser: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          password: "Default@12#$",
        },
      });
      done(err, newUser);
    }
  )
);

passport.use(
  new BearerStrategy((token, done) => {
    jwt.verify(token, SECRET_KEY, function (err, usuario) {
      if (err) return done(err);
      return done(null, usuario ? usuario : false);
    });
  })
);

module.exports = passport;
