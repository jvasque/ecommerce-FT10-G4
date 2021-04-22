const { Product, Review, User } = require("../../db.js");

module.exports = async (req, res, next) => {

  if(!req.user.id) return res.status(501).json({err: 'Unauthorized'})

    let id = req.params.id;

    if(!id) return res.json({error: "please, give us an id"})
    try {
      let data = await Review.findByPk(id);

      if(!data) return res.json({error: "the review does not exist"})

      data.destroy()
      return res.json({success: "the review was deleted succesfully"});
    } catch (err) {
      res.json(err);
      return console.log(err);
    }
  };
  