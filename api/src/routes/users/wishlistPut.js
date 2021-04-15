/*
 /users/wishlist/:wishlistId/:productId?action=["remove","add"]
 */

const { Wishlist, Product } = require('../../db.js');

module.exports = async (req, res) => {
  const wishlistId = req.params.wishlistId,
    productId = req.params.productId,
    action = req.query.action,
    wishlist = await Wishlist.findByPk(wishlistId),
    product = await Product.findByPk(productId);

  if (action === 'remove') {
    product.removeWishlists(wishlist);
    res.json(wishlist).status(204);
  } else if (action === 'add') {
    product.addWishlists(wishlist);
    res.json(wishlist).status(204);
  } else {
    res
      .json({ message: 'no changes made, action necessary in query' })
      .status(400);
  }
};
