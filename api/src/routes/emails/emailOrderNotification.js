const nodemailer = require("nodemailer");
const { user, pass } = process.env;

module.exports = async (req, res)=> {
    const { products } = req.body;
    const { email, firstName } = req.user
    console.log(products, "PRODUCTSSSSS");
    console.log(userName, "userName");
    console.log(userMail, "userMail");
    let product;

    if(!products) return res.status(500).json({error: "product missing"});
    if(!Array.isArray(products)) return res.status(500).json({error: "products should be an array"});
    if(!firstName) return res.status(500).json({error: "userName missing"});
    if(!email) return res.status(500).json({error: "userMail missing"});
    
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
    <h1>Hola ${firstName}!, confirmamos la compra de su producto</h1>
    <p>Confirmación de compra de su producto ! ! !</p>
    </br>
    <b>Tu lista de productos:</b>
    <ul>
    ${products.map(e => `<li>${e}</li>`)}
    </ul>
    </br>
    <b>Gracias por confiar en nosotros!</b>
    <div>
    <img src="https://i.ibb.co/qnDz2D5/apus.png" alt="apus" border="0"/>
    </div>
    `

    let mailOptions = {
        from: "AgroPlace <agroplaceofficial@gmail.com>",
        to: email,
        subject: `Has comprado ${product}`,
        html: htmlCreator
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) return res.status(500).send(error.message);

        res.status(200).json({answer: req.body});
    })
}