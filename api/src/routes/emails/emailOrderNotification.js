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
    <div class="email-container">
    <div class="header">
        Agroplace
    </div>
    <div class="banner">
        Hola ${userName}! Tu paquete llegará entre el ${day1} y el ${day2} de ${month}
    </div>
    <div class="body-email-container">
        <div class="tracing">
            Codigo de seguimiento
        </div>
        <div class="details">
            Detalle de envio:
            <div>${img}</div>
            <div>${Direccion}</div>
            <div>${producto}</div>
            <div>${linkaalgunlado}</div>
        </div>
    </div>
    </div>
    <footer>
        <h4>Titulo</h4>
        <div>Necesitas ayuda? Contactanos</div>
        <div>${nustrosdatoslinkeados}</div>
    </footer>
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
