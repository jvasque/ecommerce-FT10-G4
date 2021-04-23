const nodemailer = require("nodemailer");
const { user, pass } = process.env;

module.exports = async (req, res) => {
  const { products } = req.body;
  const { email, firstName } = req.user;
  console.log(products, "PRODUCTSSSSS");
  console.log(userName, "userName");
  console.log(userMail, "userMail");
  let product;

  if (!products) return res.status(500).json({ error: "product missing" });
  if (!Array.isArray(products))
    return res.status(500).json({ error: "products should be an array" });
  if (!firstName) return res.status(500).json({ error: "userName missing" });
  if (!email) return res.status(500).json({ error: "userMail missing" });

  if (products.length === 1) product = `${products[0]} !`;
  if (products.length === 2) product = `${products[0]} y ${products[1]}!`;
  if (products.length > 2) product = `${products[0]}, ${products[1]} y más !`;

  let transporter = nodemailer.createTransport({
    service: "Gmail",
    post: 587,
    secure: false,
    auth: {
      user: user,
      pass: pass,
    },
  });

  let htmlCreator = `
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
          .email-container {
    background-color: rgba(239, 239, 239, 1);
    color: rgba(42, 46, 42, 1);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(48, 126, 19);
    color: rgb(224, 192, 8);
    width: 100%;
  }
  .banner {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(42, 46, 42, 1);
    color: rgba(239, 239, 239, 1);
    width: 100%;
    margin-top: 1%;
    padding-top: 2%;
    padding-bottom: 2%;
  }
  
  .details {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 3%;
    height: 300px;
    width: 400px;
    background-color: rgba(105, 104, 104, 0.322);
    color: rgba(42, 46, 42, 1);
  }
  .detItem {
    margin: 1%;
  }
  .image {
    margin: 4%;
    height: 40%;
    width: 40%;
    background-color: rgb(224, 192, 8);
    color: rgba(105, 104, 104, 1);
  }
  footer {
    background-color: rgba(42, 46, 42, 1);
    color: rgba(239, 239, 239, 1);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 2%;
  }
      </style>
      <title>Document</title>
  </head>
  <body>
      <div class="email-container">
          <div class="header">
             <h1>Agroplace</h1> 
          </div>
          <div class="banner">
              Hola ${userName}! Tu paquete llegará entre el ${day1} y el ${day2} de ${month}
          </div>
          <div class="body-email-container">
              
              <div class="details">
                  Detalle de envio:
                  <div class="image">${img}</div>
                  <div class="detItem">${Direccion}</div>
                  <div class="detItem">${producto}</div>
                  <div class="detItem">${linkaalgunlado}</div>
              </div>
          </div>
          </div>
          <footer>
              <h4>Titulo</h4>
              <div>Necesitas ayuda? Contactanos</div>
              <div>${nustrosdatoslinkeados}</div>
          </footer>
  </body>
  </html>
    `;

  let mailOptions = {
    from: "AgroPlace <agroplaceofficial@gmail.com>",
    to: email,
    subject: `Tu orden está en camino`,
    html: htmlCreator,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return res.status(500).send(error.message);

    res.status(200).json({ answer: req.body });
  });
};
