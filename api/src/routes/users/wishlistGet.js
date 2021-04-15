// users/:id/wishlist/:name
//already set for marketplace

const { Wishlist, Product, User } = require('../../db.js');

module.exports = async (req, res, next) => {
  let id = req.query.id;

  try {
    let data = await User.findOne({
      where: {
        userId: id,
      },
      attributes: ['firstName', 'lastName'],
      include: {
        model: Wishlist,
        attributes: ['name'],
        // where: {
        //   name: name,
        // },
        through: {
          attributes: [],
        },
        include: {
          model: Product,
          attributes: [
            'name',
            'SKU',
            'unitPrice',
            'description',
            'picture',
            'score',
            'unitsOnStock',
          ],
          through: {
            attributes: [],
          },
        },
      },
    });
    return res.json(data);
  } catch (err) {
    res.json(err);
    return console.log(err);
  }
};
