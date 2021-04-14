// users/:id/wishlist/
//already set for marketplace

const { Wishlist, Product, User } = require("../../db.js");

module.exports = async (req, res, next) => {
  let id = req.params.id;

  try {
    let data = await User.findOne(
    {
      where: {
        userId: id,
      },
      include: {
        model: Wishlist,
        attributes: ['name'],
        include: {
          model: Product,
          attributes: ['name','SKU','unitPrice','description','picture', 'score', 'unitsOnStock'],
        },
      },
    });  
    return res.json(data);
  } catch (err) {
    res.json(err);
    return console.log(err);
  }
};



