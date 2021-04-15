const { NewsletterOption } = require("./../db.js");

module.exports = async (req, res, next) => {

  try {
      const {
          name,
          email
      } = req.body;
      const newsLetther = await NewsletterOption.create({
          name,
          email
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
