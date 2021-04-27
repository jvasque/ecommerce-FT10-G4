const {
    NewsletterOption,
    User
} = require("../../db.js");

const enviarEmail = require('./../../handlers/email');

module.exports = async (req, res) => {

    try {
        let id = 0;

        let name = '';
        let email = '';

        if (req.body.id) {
            id = req.body.id;

            const user = await User.findOne({
                where: {
                    id
                }
            });

            if (user !== null) {
                name = user.firstName;
                email = user.email;
            } else {
                return res.json({
                    message: "Ese usuario no existe"
                });
            }
        } else {
            name = req.body.name;
            email = req.body.email;
        }

        const {
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
        } else {
            return res.json({
                message: "El email ya está en nuestra base de datos"
            });
        }
    } catch (error) {
        return res.json({
            newsLetther: {},
            message: error.message
        });
        console.log(error.message);
    }
};