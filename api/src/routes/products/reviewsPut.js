const { Product, Review, User } = require("../../db.js");

module.exports = async (req, res, next) => {

  if(!req.user.id) return res.status(501).json({err: 'Unauthorized'})

  let id = req.params.id;
  let {text, rate} = req.body.params;


  if (!id) return res.json({ error: "please, give us an id" });
  try {
    let data = await Review.findByPk(id);

    if (data) {
      if(text) data.update({content: text});
      if(rate) data.update({score: rate});
    } else {
        return res.json({ error: "there are not reviews with this ID" });
    }
    return res.json(data);
  } catch (err) {
    res.json(err);
    return console.log(err);
  }
};
