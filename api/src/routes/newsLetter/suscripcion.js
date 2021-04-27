const {
    NewsletterOption,
    User
} = require("../../db.js");

const enviarEmail = require('./../../handlers/email');


module.exports = async (req, res) => {

    try {
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

        if (newsLetter !== null) {
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
        } else {
            //página de error         
            return res.render(`${__dirname}/../../views/emails/layoutError.pug`, {
                name: newsLetter.name,
                url: "http://localhost:3000/"
            });
        }
    } catch (error) {
        //Página de error
        return res.render(`${__dirname}/../../views/emails/layoutError.pug`, {
            name: newsLetter.name,
            error,
            url: "http://localhost:3000"
        });
    }
};