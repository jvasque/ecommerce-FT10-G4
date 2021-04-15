// /users/wishlist/:userId?name=

const { Wishlist, User } = require('../../db.js');

module.exports = async (req, res, next) => {
  let userId = req.params.userId,
    listName = req.query.name;

  try {
    let [newWishlist] = await Wishlist.findOrCreate({
      where: { name: listName },
    });

    let newUser = await User.findByPk(userId);

    await newUser.addWishlists(newWishlist);

    return res.json(newWishlist);
  } catch (err) {
    console.log(err);
  }
};
