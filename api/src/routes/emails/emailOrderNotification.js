const nodemailer = require("nodemailer");

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
    if(products.length > 1) product = `${products[0]} y más !`;

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        post: 587,
        secure: false,
        auth: {
            user: 'agroplaceofficial@gmail.com',
            pass:'Henry@12#$'
        }
    });

    let htmlCreator = `
    <h1>Hola ${userName}!, confirmamos la compra de su producto</h1>
    `

    let mailOptions = {
        from: "AgroPlace <agroplaceofficial@gmail.com>",
        to: userMail,
        subject: `Has comprado ${product}`,
        text: "Confirmación de orden de su producto ! ! !",
        html: htmlCreator
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) return res.status(500).send(error.message);

        res.status(200).json({answer: req.body});
    })
}