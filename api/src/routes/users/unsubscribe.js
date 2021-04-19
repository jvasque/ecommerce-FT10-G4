const { NewsletterOption } = require("../../db.js");

module.exports = async (req, res, next) => {


  try {
      const {
          email,
          boletinesInformativos,
          promociones,
          nuevosLanzamientos
      } = req.body;
      
        const newsLetter = await NewsletterOption.update({
          boletinesInformativos,
          promociones,
          nuevosLanzamientos
        }, {
            where: {
                email
            }
        });

      res.json({
                    newsLetther: newsLetter,
                    message: "ok"
                });
  } catch (err) {
      res.json({
                newsLetther: {},
                message: err.message
            });
      console.log(err.message);
  }

};
