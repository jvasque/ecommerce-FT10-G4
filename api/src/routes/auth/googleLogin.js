const { User } = require("../../db");
const { SECRET_KEY, GOOGLE_CONSUMER_KEY, user, pass } = process.env;
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(

    GOOGLE_CONSUMER_KEY
  );

module.exports=  async (req, res) => {
    const { tokenId } = req.body;
    
    try {
      const response = await client.verifyIdToken({
        idToken: tokenId,
        audience:
        GOOGLE_CONSUMER_KEY,
      });
      // console.log(response)
      const {
        email_verified,
        sub,
        given_name,
        family_name,
        email,
        picture,
      } = response.payload;
      if (email_verified) {
        const find = await User.findOne({
          where: {
            email: email,
          },
        });
        if (find) {
          
          if (!find.firstName) await find.update({ firstName: given_name });
          if (!find.lastName) await find.update({ lastName: family_name });
          if (!find.googleId) await find.update({ googleId: sub });
          if (!find.photoURL) await find.update({ photoURL: picture });
          // const token = jwt.sign(find.toJSON(), SECRET_KEY)
          console.log(find.type.includes("admin"))
          if (find.type.includes("admin")) {
            
            let arr = [];
            let secretNumber;
            for (let i = 0; i < 6; i++) {
              let numero = Math.floor(Math.random() * 10);
              arr.push(numero);
            }
            secretNumber = arr.join("");
            await find.update({ secretCode: secretNumber });
            await find.update({ secretCodeExpires: Date.now() + 15 * 60 * 1000 });
            const token = jwt.sign(find.toJSON(), SECRET_KEY)
            
            let transporter = nodemailer.createTransport({
              service: "Gmail",
              post: 587,
              secure: false,
              auth: {
                user: user,
                pass: pass,
              },
            });
     
            let htmlCreator = `<html>
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
            <h1>Hola ${find.firstName}, hemos generado un codigo para que Ud.</h1>
            <h4>Ingrese este codigo ${secretNumber}</h4>
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
              to: find.email,
              subject: `cambio de contraseña, usuario: ${find.firstName}`,
              html: htmlCreator,
            };
         console.log('llegueeeeee!!')// mandar el codigo 
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) return res.status(500).send(error.message);
        
              // res.status(200).json({ answer: req.body });
            }); 
           
            res.json(token);
          } else {
            const token = jwt.sign(find.toJSON(), SECRET_KEY)
            res.json(token);
          }
          // console.log(find.toJSON.status, find.toJSON())
          //setear logica de status, type ando reset password
          // res.json(token);
        } else {
          
          const newUser = await User.create({
            firstName: given_name,
            lastName: family_name,
            email: email,
            password: "Henry@12#$",
            googleId: sub,
            photoURL: picture
          });
          const token = jwt.sign(newUser.toJSON(), SECRET_KEY)
          res.json(token)
        }
      } else {
        res.status(401).json({message: "email no verificado"})
      }
    } catch (e) {
     res.status(401).json({message: 'no fue autorizado'})
    }
  }