const { Review } = require("../../db.js");

module.exports = async (req, res, next) => {

    let id = req.params.id;

    if(!id) return res.json({error: "please, give us an id"})
    try {
      let data = await Review.findAndCountAll({
        where:{
          productId:id
        }
      });

      if(!data) return res.json({error: "there are not reviews for this product"});

      let findSum = data.rows?.map(e => parseInt(e.score));
      let result = (findSum?.reduce((a,b) => a+b, 0)) / data.count;
      
      return res.json(result);
    } catch (err) {
      res.json(err);
      return console.log(err);
    }
  };
  