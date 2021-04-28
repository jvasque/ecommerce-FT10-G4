const { Review, Product } = require('../../db.js');
//const { Sequelize, Op } = require('sequelize');

module.exports = async (req, res) => {
  let productId = req.params.id

    let {
    text,
    rate,
    userId
  } = req.body.params;

  //Inicio barrera de doble comentario //Decomentar en caso de ser necesario, entra en conflicto en caso de que un Admin quiera comentar 
  //mas de una vez el mismo producto
  /* const hasOneComment = await Review.findOne({
    where: {
      userId: userId,
      productId: productId
    }
  })

  if(hasOneComment) return res.json({error: "You've alredy commented on this product!"}) */
  //Fin barrera doble comentario

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
