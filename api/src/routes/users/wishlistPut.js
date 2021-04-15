/*
 /users/wishlist/:wishlistId/:productId?action=["remove","add"]
 */

const { Wishlist, Product } = require('../../db.js');

module.exports = async (req, res) => {
  const wishlistId = req.params.wishlistId,
    productId = req.params.productId,
    action = req.query.action,
    result = [];
    wishlist = await Wishlist.findByPk(wishlistId),
    product = await Product.findByPk(productId);

  if (action === 'remove') {
    await product.removeWishlists(wishlist);
  } else if (action === 'add') {
    await product.addWishlists(wishlist);
  } else {
    result.push({ message: 'no changes made, action necessary in query' });
    result.push(400);
  }
  result.push(await Wishlist.findOne({
    where: {id: wishlistId},
    include: {
      model: Product,
    }
  }));
  result.push(204);
  res.json(result[0]).status(result[0]);
};
