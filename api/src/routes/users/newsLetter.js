//const path = require("path");

const { NewsletterOption, User } = require("../../db.js");

const server = require("express").Router();

const enviarEmail = require("./../../handlers/email");

//Inicia el proceso de suscripción, por el momento no maneja token
server.post("/email", async (req, res, next) => {
  try {
    const {
      name,
      email,
      boletinesInformativos,
      promociones,
      nuevosLanzamientos,
    } = req.body;

    const [newsLetter, created] = await NewsletterOption.findOrCreate({
      where: {
        email,
      },
      defaults: {
        name,
        email,
      },
    });

    if (created) {
      const url = `http://localhost:3001/newsLetter/suscripcion?id=${newsLetter.id}&boletinesInformativos=${boletinesInformativos}&promociones=${promociones}&nuevosLanzamientos=${nuevosLanzamientos}`;
      //const urlBaja = `http://localhost:3001/newsLetter/desuscribir?id=${newsLetter.id}&boletinesInformativos=true&promociones=false&nuevosLanzamientos=false`;

      await enviarEmail.enviar({
        email,
        name,
        subject: "Suscripción Agro Place",
        url,
        archivo: "layout-suscription", // aqui va la plantilla
      });

      return res.json({
        message: `En su bandeja de entrada llegará la autorización para la suscripción, 
                          por favor verifique su correo no deseado y agreguenos a sus favoritos`,
      });
    } else {
      return res.json({
        message: "El email ya está en nuestra base de datos",
      });
    }
  } catch (error) {
    return res.json({
      newsLetther: {},
      message: error.message,
    });
    console.log(error.message);
  }
});

//Aca termina el proceso de suscripción desde el correo electrónico
server.get("/suscripcion", async (req, res, next) => {
  try {
    const {
      id,
      boletinesInformativos,
      promociones,
      nuevosLanzamientos,
    } = req.query;

    const newsLetter = await NewsletterOption.findOne({
      where: {
        id,
      },
    });

    if (newsLetter !== null) {
      await NewsletterOption.update(
        {
          active: true,
          boletinesInformativos,
          promociones,
          nuevosLanzamientos,
        },
        {
          where: {
            id,
          },
        }
      );

      const html = `
                            <html>
                                <head>
                                    <title>Suscription</title>
                                </head>
                                <body>
                                <h3>${newsLetter.name} Usted está suscrito a nuestros boletines </h3>
                                <a href="http://localhost:3000"> para terminar haga click aquí </a>
                                </body>
                            </html>
                        `;

      res.send(html);
    } else {
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
  } catch (error) {
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

server.get("/desuscribir", async (req, res, next) => {
  try {
    const {
      id,
      boletinesInformativos,
      promociones,
      nuevosLanzamientos,
    } = req.query;

    const newsLetter = await NewsletterOption.findOne({
      where: {
        id,
      },
    });

    if (newsLetter !== null) {
      console.log(
        "Que pasa pues?",
        boletinesInformativos,
        promociones,
        nuevosLanzamientos
      );

      if (
        (boletinesInformativos === "false" &&
          promociones === "false" &&
          nuevosLanzamientos === "false") ||
        (boletinesInformativos === false &&
          promociones === false &&
          nuevosLanzamientos === false)
      ) {
        await NewsletterOption.update(
          {
            active: false,
            boletinesInformativos,
            promociones,
            nuevosLanzamientos,
          },
          {
            where: {
              id,
            },
          }
        );

        const html = `
                                <html>
                                    <head>
                                        <title>Desuscripción total</title>
                                    </head>
                                    <body>
                                    <h3>${newsLetter.name} Usted se desuscribio de nustros boletines, ya no recibiras correos</h3>
                                    <a href="http://localhost:3000/home"> Vuela a nuestra Agro Place </a>
                                    </body>
                                </html>
                            `;

        res.send(html);
      } else {
        await NewsletterOption.update(
          {
            boletinesInformativos,
            promociones,
            nuevosLanzamientos,
          },
          {
            where: {
              id,
            },
          }
        );

        const html = `
                                <html>
                                    <head>
                                        <title>Desuscripción parcial</title>
                                    </head>
                                    <body>
                                    <h3>${newsLetter.name} Usted se desuscribio de alguno de nustros boletines </h3>
                                    <a href="http://localhost:3000/home"> Vuela a nuestra Agro Place</a>
                                    </body>
                                </html>
                            `;

        res.send(html);
      }
    } else {
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
  } catch (error) {
    return res.json({
      message: "Error " + error,
    });
  }
});

server.get("/correo-masivo-de-prueba", async (req, res, next) => {
  const boletinesInformativos = true;
  const promociones = true;
  const nuevosLanzamientos = true;

  try {
    const users = await User.findAll();

    for (let i = 0; i < users.length; i++) {
      const url = `http://localhost:3001/newsLetter/suscripcion?id=${users[i].id}&boletinesInformativos=${boletinesInformativos}&promociones=${promociones}&nuevosLanzamientos=${nuevosLanzamientos}`;
      //const urlBaja = `http://localhost:3001/newsLetter/desuscribir?id=${newsLetter.id}&boletinesInformativos=true&promociones=false&nuevosLanzamientos=false`;

      await enviarEmail.enviar({
        email: users[i].email,
        name: users[i].firstName,
        subject: "Suscripción Agro Place",
        url,
        archivo: "layout-suscription",
      });
    }

    return res.json({
      message: "Los correos han sido enviados",
    });
  } catch (error) {
    return res.json({
      message: "Error " + error,
    });
  }
});

module.exports = server;
