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
            if ((boletinesInformativos === "false" && promociones === "false" && nuevosLanzamientos === "false") ||
                (boletinesInformativos === false && promociones === false && nuevosLanzamientos === false)) {
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
            } else {
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
        } else {
            //Página de error
            return res.render(`${__dirname}/../../views/emails/layoutError.pug`, {
                name: newsLetter.name,
                error,
                url: "http://localhost:3000"
            });
        }
    } catch (error) {
        return res.json({
            message: "Error " + error
        });
    }
};