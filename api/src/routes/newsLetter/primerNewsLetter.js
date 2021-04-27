const {
    NewsletterOption,
    User
} = require("../../db.js");

const enviarEmail = require('./../../handlers/email');


module.exports = async (req, res) => {

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

};