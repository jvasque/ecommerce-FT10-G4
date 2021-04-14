const { Wishlist, User } = require("../../db.js");

module.exports = async (req, res, next) => {
    var user = req.params.id;
  var product = req.params.productId;
  var wishlist = req.params.name;
  var erase = await User.findOne({
    where: {
      id: user,
    },
    include: {
        model: Wishlist,
        where: {
            name: wishlist,
        },
        include: {
            model: Product,
            where: {
                id: productId,
            }
        }
    }
  });
  if (erase) {
    // await product.destroy();
    return res.json(erase);
  } else {
    return res.json({ error: "that product cannot be find" }).status(400);
  }
};