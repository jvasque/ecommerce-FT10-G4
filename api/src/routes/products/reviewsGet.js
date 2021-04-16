const { Product, Review } = require("../../db.js");

module.exports = async (req, res, next) => {
    console.log(req.body, "BODYYYY");
    console.log(req.query, "QUERYYY");
    console.log(req.params, "PARAMSSSS");
    let id = req.params.id;

    if(!id) return res.json({error: "please, give us an id"})
    try {
      let data = await Review.findAll({
        where:{
          productId:id
        }
      });

      if(!data) return res.json({error: "there are not reviews for this product"})
      return res.json(data);
    } catch (err) {
      res.json(err);
      return console.log(err);
    }
  };
  