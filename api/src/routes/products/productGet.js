const { Product, OrderDetail, Review, Promotion } = require("../../db.js");

module.exports = async (req, res, next) => {
  try {
    //scores update
    let totalProducts = await Product.findAndCountAll()
    let nm = totalProducts.count
    for(let i = 1; i <= nm ; i++){
      let productScore = await Product.findOne({
          where: {
              id: i
          },
          attributes: ['id'],
          include: {
              model: Review,  
              attributes: ['score']
          }
      })
      let meanScore = () => {
          let scores = productScore.dataValues.reviews.map(review => {
              return parseInt(review.dataValues.score)
          })
          if(scores.length){
              return scores.reduce((acc, curr) => {return acc + curr})/scores.length
          }else{
              return 0.01
          }
      }
      let mean = meanScore()
      productScore.score = mean

      await productScore.save()       
    }  

    let data = await Product.findAll({
      include: [
        {
          model: Promotion,
          where: {
            active: true,
          },
          required: false,
        },
        {
          model: OrderDetail,
          include: Review,
        },
      ],
    });
    return res.json(data);
  } catch (err) {
    res.json(err);
    return console.log(err);
  }
};
