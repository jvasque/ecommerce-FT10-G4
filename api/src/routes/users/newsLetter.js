const path = require("path");

const { NewsletterOption } = require("../../db.js");

const server = require("express").Router();

const nodemailer = require('nodemailer');

//Inicia el proceso de suscripción
server.post('/email', async (req, res, next) => {

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

        if (created) {
            const url = `http://localhost:3001/newsLetter/suscripcion?id=${newsLetter.newsletterOptionId}&boletinesInformativos=${boletinesInformativos}&promociones=${promociones}&nuevosLanzamientos=${nuevosLanzamientos}`;

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
                text: name + ' Usted se ha suscrito a nuestros servicios de Agro Place, ' + url
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
        } else {
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

}); 

//Aca termina el proceso de suscripción desde el correo electrónico
server.get('/suscripcion', async (req, res, next) => {

    try 
    {
        const {
            id,
            boletinesInformativos,
            promociones,
            nuevosLanzamientos
        } = req.query;
        
        //const newsLetter = NewsletterOption.findByPk(id);

        const newsLetter = await NewsletterOption.findOne({
            where: {
                newsletterOptionId: id
            }
        });

        if (newsLetter !== null)
        {
            await NewsletterOption.update({
                active: true,
                boletinesInformativos,
                promociones,
                nuevosLanzamientos
            }, {
                where: {
                    newsletterOptionId : id
                }
            });

            const html = `
                            <html>
                                <head>
                                    <title>Error</title>
                                </head>
                                <body>
                                <h3>${newsLetter.name} Usted está suscrito a nuestros boletines</h3>
                                <a href="http://localhost:3000/newsletter">para terminar haga click aquí </a>
                                </body>
                            </html>
                        `;

            res.send(html);
        }
        else
        {
            const html = `
                            <html>
                                <head>
                                    <title>Error</title>
                                </head>
                                <body>
                                Usuario no válido
                                </body>
                            </html>
                        `;

            res.send(html);
        }           
    } 
    catch (error) 
    {
        const html = `
                        <html>
                            <head>
                                <title>Error</title>
                            </head>
                            <body>
                            ${Error}
                            </body>
                        </html>
                    `;    

        res.send(html);    
    }    
});

module.exports = server;
