// users/wishlist?id=

const { Wishlist, Product, User } = require('../../db.js');

module.exports = async (req, res) => {
  let id = req.query.id;

  try {
    let data = await User.findOne({
      where: {
        id: id,
      },
      attributes: ['id', 'firstName', 'lastName'],
      include: {
        model: Wishlist,
        attributes: ['id', 'name'],
        include: {
          model: Product,
          attributes: [
            'id',
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
