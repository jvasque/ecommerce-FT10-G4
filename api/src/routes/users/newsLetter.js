const { NewsletterOption } = require("../../db.js");

const nodemailer = require('nodemailer');

module.exports = async (req, res, next) => {

    try {
      const {
          name,
          email,
          boletinesInformativos,
          promociones,
          nuevosLanzamientos
      } = req.body;
        
        const [newsLetter, created] = await NewsletterOption.findOrCreate({
            where: {
                email
            },
            defaults: {
                name,
                email
            }
        });

        if (created) 
        {
            const url = `http://localhost:3001/suscripcionNewsLetter?id=${newsLetter.newsletterOptionId}&boletinesInformativos=${boletinesInformativos}&promociones=${promociones}&nuevosLanzamientos=${nuevosLanzamientos}`;

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'developer2021vlad@gmail.com',
                    pass: 'Henry2021'
                }
            });

            let mailOptions = {
                from: 'developer2021vlad@gmail.com',
                to: email,
                subject: 'Suscripción Agro Place',
                text: 'Usted se ha suscrito a nuestros servicios de Agro Place, ' + url
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    return res.json({
                        message: error
                    });
                } else {
                    console.log('Email enviado: ' + info.response);

                    return res.json({
                        message: "En su bandeja de entrada llegará la autorización para la suscripción"
                    });
                }
            });
        }    
        else
        {
                    return res.json({
                        message: "El email ya está en nuestra base de datos"
                    });
        }

    } catch (err) {
        return res.json({
            newsLetther: {},
            message: err.message
        });
        console.log(err.message);
    }


    


};
