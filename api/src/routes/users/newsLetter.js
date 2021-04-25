//const path = require("path");

const { NewsletterOption, User } = require("../../db.js");

const server = require("express").Router();

const enviarEmail = require('./../../handlers/email');

//Inicia el proceso de suscripción del usuario guest, por el momento no maneja token
server.post('/email', async (req, res, next) => {

    try 
    {
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
            const url = `http://localhost:3001/newsLetter/suscripcion?id=${newsLetter.id}&boletinesInformativos=${boletinesInformativos}&promociones=${promociones}&nuevosLanzamientos=${nuevosLanzamientos}`;
            //const urlBaja = `http://localhost:3001/newsLetter/desuscribir?id=${newsLetter.id}&boletinesInformativos=true&promociones=false&nuevosLanzamientos=false`;


            //Envía al correo la plantilla, para verificar el email y el cambio
            // de estado de false a true en la base de datos
            await enviarEmail.enviar({

                email,
                name,
                subject: 'Suscripción Agro Place',
                url,
                archivo: 'layoutEmail1' // aqui va la plantilla               

            });

            return res.json({
                message: `En su bandeja de entrada llegará la autorización para la suscripción, 
                          por favor verifique su correo no deseado y agreguenos a sus favoritos`
            });            
        }
        else
        {
            return res.json({
                message: "El email ya está en nuestra base de datos"
            });
        }
    } 
    catch (error) 
    {
        return res.json({
            newsLetther: {},
            message: error.message
        });
        console.log(error.message);        
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

        const newsLetter = await NewsletterOption.findOne({
            where: {
                id
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
                    id
                }
            });

            // página de confirmación e información a los boletines que se esta registrando y
            //envia nuevamente al home de Agroplace
            return res.render(`${__dirname}/../../views/emails/layoutPagActivation.pug`, {
                name: newsLetter.name,
                url: `http://localhost:3001/newsletter/primerNewsLetter?id=${id}&name=${newsLetter.name}&email=${newsLetter.email}&boletinesInformativos=${boletinesInformativos}&promociones=${promociones}&nuevosLanzamientos=${nuevosLanzamientos}`
                       
            });
        }
        else
        {   
            //página de error         
            return res.render(`${__dirname}/../../views/emails/layoutError.pug`, {
                name: newsLetter.name,
                url: "http://localhost:3000/"
            });         
        }           
    } 
    catch (error) 
    {
        //Página de error
        return res.render(`${__dirname}/../../views/emails/layoutError.pug`, {
            name: newsLetter.name,
            error,
            url: "http://localhost:3000"
        });
    }    
});

server.get('/primerNewsLetter', async (req, res, next) => {

        const {
            id,
            name,
            email
        } = req.query;

     await enviarEmail.enviar({

         email, 
         name,
         subject: 'Boletin No 1 Agro Place',
         urlBaja: `http://localhost:3001/newsLetter/desuscribir?id=${id}&boletinesInformativos=false&promociones=false&nuevosLanzamientos=false`,
         archivo: 'layoutEmail2' // aqui va la plantilla               

     });


    res.redirect("http://localhost:3000");

});

server.get('/desuscribir', async (req, res, next) => {

    try 
    {
        const {
            id,
            boletinesInformativos,
            promociones,
            nuevosLanzamientos
        } = req.query;

        const newsLetter = await NewsletterOption.findOne({
            where: {
                id
            }
        });

        if (newsLetter !== null)
        {
            if ((boletinesInformativos === "false" && promociones === "false" && nuevosLanzamientos === "false") || 
                (boletinesInformativos === false && promociones === false && nuevosLanzamientos === false))
            {
                await NewsletterOption.update({
                    active: false,
                    boletinesInformativos,
                    promociones,
                    nuevosLanzamientos
                }, {
                    where: {
                        id
                    }
                });

                //Página que informa la desuscripción a los boletines y vuelve al home AgroPlace
                return res.render(`${__dirname}/../../views/emails/layoutPagUnsubscribe.pug`, {
                    name: newsLetter.name,
                    url: "http://localhost:3000"
                });
            }    
            else
            { 
                await NewsletterOption.update({
                    boletinesInformativos,
                    promociones,
                    nuevosLanzamientos
                }, {
                    where: {
                        id
                    }
                });    
                
                return res.render(`${__dirname}/../../views/emails/layoutPagUnsubscribe.pug`, {
                    name: newsLetter.name,
                    url: "http://localhost:3000"
                });
            }    
        }
        else
        {
            //Página de error
            return res.render(`${__dirname}/../../views/emails/layoutError.pug`, {
                name: newsLetter.name,
                error,
                url: "http://localhost:3000"
            });
        }
    } 
    catch (error) 
    {
        return res.json({
            message: "Error " + error
        });
    }
});

server.get('/correo-masivo-de-prueba', async (req, res, next) => {

    const boletinesInformativos = true;
    const promociones = true;
    const nuevosLanzamientos = true;

    try 
    {
        const users = await User.findAll();

        for (let i = 0; i < users.length; i++) 
        {
            const url = `http://localhost:3001/newsLetter/suscripcion?id=${users[i].id}&boletinesInformativos=${boletinesInformativos}&promociones=${promociones}&nuevosLanzamientos=${nuevosLanzamientos}`;
            //const urlBaja = `http://localhost:3001/newsLetter/desuscribir?id=${newsLetter.id}&boletinesInformativos=true&promociones=false&nuevosLanzamientos=false`;

            await enviarEmail.enviar({

                email: users[i].email,
                name: users[i].firstName,
                subject: 'Suscripción Agro Place',
                url,
                archivo: 'layout-suscription'

            });
        }

        return res.json({
            message: "Los correos han sido enviados"
        });
    } 
    catch (error) 
    {
        return res.json({
            message: "Error " + error
        });
    }

});

module.exports = server;