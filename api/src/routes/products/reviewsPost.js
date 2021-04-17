const { Review, Product } = require('../../db.js');
//const { Sequelize, Op } = require('sequelize');

module.exports = async (req, res) => {
    
    let {
    text,
    rate,
    productId
  } = req.body.params;

  try {
    const addReview = await Review.findOrCreate({
      where: {
        score: rate,
        content: text
      },
    });
    
    const created = await Review.findOne({
        where: {
          score: rate,
          content: text
        },
      });
      
    const findProduct = await Product.findOne({
      where: {
        id: productId
      },
    });
    
    await created.setProduct(findProduct);

    return res.json(created);
  } catch (err) {
    console.log(err);
    res.json({ error: 'an error occurred while loading the data' });
  }
};
