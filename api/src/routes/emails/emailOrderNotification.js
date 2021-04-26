const nodemailer = require("nodemailer");
const { user, pass } = process.env;

module.exports = async (req, res) => {
  const { products, address } = req.body;
  const { email, firstName } = req.user;
  /* console.log(products, "PRODUCTSSSSS");
  console.log(userName, "userName");
  console.log(userMail, "userMail"); */

  if (!products) return res.status(500).json({ error: "product missing" });
  if (!Array.isArray(products))
    return res.status(500).json({ error: "products should be an array" });
  if (!firstName) return res.status(500).json({ error: "userName missing" });
  if (!email) return res.status(500).json({ error: "userMail missing" });

  let transporter = nodemailer.createTransport({
    service: "Gmail",
    post: 587,
    secure: false,
    auth: {
      user: user,
      pass: pass,
    },
  });

  //Defino las fechas


  function sumarDias(fecha, dias){
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }
  
  var currentDate1 = new Date();
  var currentDate2 = new Date();

  var day1 = sumarDias(currentDate1, 2);
  var day2 = sumarDias(currentDate2, 4);

  function dayOftheWeek(date){
    switch (date) {
        case 0:
            return "Domingo";
        case 1:
            return "Lunes";
        case 2:
            return "Martes";
        case 3:
            return "Miércoles";
        case 4:
            return "Jueves";
        case 5:
            return "Viernes";
        case 6:
            return "Sábado";
    
        default:
            break;
    }
  }

  function monthOfTheYear(date){
    switch (date) {
        case 0:
            return "Enero";
        case 1:
            return "Febrero";
        case 2:
            return "Marzo";
        case 3:
            return "Abril";
        case 4:
            return "Mayo";
        case 5:
            return "Junio";
        case 6:
            return "Julio";
        case 7:
            return "Agosto";
        case 8:
            return "Septiembre";
        case 9:
            return "Octubre";
        case 10:
            return "Noviembre";
        case 11:
            return "Diciembre";
    
        default:
            break;
    }
  }

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
  display: block;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
.header {
  display: block;
  margin-left: auto;
  margin-right: auto;
  background-color: rgb(48, 126, 19);
  color: rgb(224, 192, 8);
  width: 100%;
  text-align: center;
}
.banner {
  display: block;
  margin-left: auto;
  margin-right: auto;
  background-color: rgba(42, 46, 42, 1);
  color: rgba(239, 239, 239, 1);
  width: 100%;
  margin-top: 1%;
  padding-top: 2%;
  padding-bottom: 2%;
  text-align: center;
}

.details {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3%;
  margin-bottom: 3%;
  height: fit-content;
  width: 400px;
  background-color: rgba(105, 104, 104, 0.322);
  color: rgba(42, 46, 42, 1);
  text-align: center;
}
.detItem {
    display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1%;
  text-align: center;
}
.image {
    margin-left: auto;
  margin-right: auto;
  margin-top: 4%;
  margin-bottom: 4%;
  height: 175px;
  width: 175px;
  background: url("https://i.ibb.co/5v1VxrH/green-truck-Este-ES-LA-POSTA.png");
  background-size: cover;
}
footer {
  background-color: rgba(42, 46, 42, 1);
  color: rgba(239, 239, 239, 1);
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  padding-left: auto;
  padding-right: auto;
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
            <p>Hola ${firstName}! Tu paquete llegará entre el ${dayOftheWeek(day1.getUTCDay())} ${day1.getUTCDate()} de ${monthOfTheYear(day1.getUTCMonth())} y el ${dayOftheWeek(day2.getUTCDay())} ${day2.getUTCDate()} de ${monthOfTheYear(day2.getUTCMonth())}</p>
        </div>
        <div class="body-email-container">
            
            <div class="details">
                Detalle de envio:
                <div class="image"></div>
                <div class="detItem">Dirección de entrega: ${address}</div>
                <div class="detItem">Tus productos: 
                  <ul>
                    ${products?.map(e => `<li>${e}</li>`)}
                  </ul>
                </div>
            </div>
        </div>
        </div>
        <footer>
            <div>Necesitas ayuda? Contáctanos: agroplaceofficial@gmail.com </div>
            <div><a href="http://localhost:3000/" target="_blank" rel="noopener noreferrer">Visítanos</a></div>
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
