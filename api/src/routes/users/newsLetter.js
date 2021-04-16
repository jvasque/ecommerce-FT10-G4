const { NewsletterOption } = require("../../db.js");

module.exports = async (req, res, next) => {

  try {
      const {
          name,
          email,
          boletinesInformativos,
          promociones,
          nuevosLanzamientos
      } = req.body;
      const newsLetther = await NewsletterOption.create({
          name,
          email,
          boletinesInformativos,
          promociones,
          nuevosLanzamientos
      });
      res.json({
                    newsLetther: newsLetther,
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
