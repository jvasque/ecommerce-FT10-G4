const { Review, Product } = require('../../db.js');
//const { Sequelize, Op } = require('sequelize');

module.exports = async (req, res) => {
  let productId = req.params.id

    let {
    text,
    rate,
    userId
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
    await created.setUser(userId);

    return res.json(created);
  } catch (err) {
    console.log(err);
    res.json({ error: 'an error occurred while loading the data' });
  }
};
