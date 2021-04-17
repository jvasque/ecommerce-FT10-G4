// /users/:id/wishlist/:wishlistId/:productId?action="action"

const { Wishlist, User } = require('../../db.js');

module.exports = async (req, res, next) => {
  const wishlistId = req.params.wishlistId,
    productId = req.params.productId,
    action = req.query.action; // remove, add

  let user = await User.findOne({ where: { id: userId } });
  let wishlist = null;
  let product = null;

  if (action === 'remove') {
    newProduct.removeWishlists(newWislist);
    res.json().status(204);
  } else if (action === 'add') {
    newProduct.addWishlists(newWislist);
    res.json().status(204);
  } else {
    res
      .json({ message: 'no changes made, action necessary in query' })
      .status(400);
  }
};
