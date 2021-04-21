const nodemailer = require("nodemailer");
const { user, pass } = process.env;

module.exports = async (req, res)=> {
    const { products, userName, userMail } = req.body;
    console.log(products, "PRODUCTSSSSS");
    console.log(userName, "userName");
    console.log(userMail, "userMail");
    let product;

    if(!products) return res.status(500).json({error: "product missing"});
    if(!Array.isArray(products)) return res.status(500).json({error: "products should be an array"});
    if(!userName) return res.status(500).json({error: "userName missing"});
    if(!userMail) return res.status(500).json({error: "userMail missing"});
    
    if(products.length === 1) product = `${products[0]} !`;
    if(products.length === 2) product = `${products[0]} y ${products[1]}!`;
    if(products.length > 2) product = `${products[0]}, ${products[1]} y más !`;

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        post: 587,
        secure: false,
        auth: {
            user: user,
            pass: pass
        }
    });

    let htmlCreator = `
    <html>
    <head>
    <style type="text/css">
    .containergral {
        align-content: center;
        justify-content: center;
        padding: 30px;
        position: relative;
        background: #EFEFEF;
        }
    h1 {
        color: #378A19;
    }
    .unorderlist {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background: #F7F7F7;
        color: #378A19;
      }
    .img-card {
        margin-left: 25%;
        margin-top: 20px    
    }
    </style>
    </head>
    <body>
    <div class="containergral">
    <h1>Hola ${userName}!, confirmamos la compra de su producto</h1>
    <p>Confirmación de compra de su producto ! ! !</p>
    </hr>
    <b>Tu lista de productos:</b>
    <div class="unorderlist">
    <ul>
    ${products.map(e => `<li>${e}</li>`)}
    </ul>
    </div>
    </hr>
    <b>Gracias por confiar en nosotros!</b>
    <div class="img-card">
    <img src="https://i.ibb.co/qnDz2D5/apus.png" alt="apus" border="0"/>
    </div>
    </div>
    </body>
    </html>
    `

    let mailOptions = {
        from: "AgroPlace <agroplaceofficial@gmail.com>",
        to: userMail,
        subject: `Has comprado ${product}`,
        html: htmlCreator
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) return res.status(500).send(error.message);

        res.status(200).json({answer: req.body});
    })
}