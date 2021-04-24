const Sequelize = require('sequelize');
const { Product, Category } = require('../../db.js');
// /products/filter?recommended=[true/false]

module.exports = async (req, res, next) => {
  let array = req.body.array;
  let isRecommended = req.query.recommended;
  let favProducts,
    recCategories,
    recProducts = [],
    pickRandom = [];

  // TOTAL DE PRODUCTOS EN LA DB
  let totalProducts = await Product.count();
  console.log('Products have: ', totalProducts, ' items');

  console.log(array);
  console.log(isRecommended);

  try {
    //pide recommended pero tiene favoritos
    if (array) {
      favProducts = await Product.findAll({
        attributes: [
          'id',
          'name',
          'description',
          'unitPrice',
          'picture',
          'score',
        ],
        where: {
          id: { [Sequelize.Op.in]: array },
        },
        include: {
          model: Category,
          through: {
            attributes: [],
          },
        },
      });

      //pide favoritos, tiene y no pide recommended, devuelvo favoritos
      if (isRecommended !== 'true') {
        console.log(favProducts);
        return res.json(favProducts).status(200); // CASE 1
      }

      //pide recommended y tiene favoritos
      if (req.query.recommended === 'true') {
        recCategories = favProducts.map((product) => {
          return product.categories[0].id;
        });

        console.log('Initial categories: ', recCategories);

        // subCase 2: mas de 4
        if (recCategories.length > 4) {
          let randomN = Math.floor(Math.random() * recCategories.length - 3);

          recCategories = recCategories.slice(randomN, randomN + 4);

          console.log('Reduced categories: ', recCategories);

          // recCategories = [
          //   recCategories[Math.floor(Math.random() * recCategories.length)],
          //   recCategories[Math.floor(Math.random() * recCategories.length)],
          //   recCategories[Math.floor(Math.random() * recCategories.length)],
          //   recCategories[Math.floor(Math.random() * recCategories.length)]
          // ]
        }

        for (let i = 0; i < recCategories.length; i++) {
          const category = recCategories[i];
          pickRandom = await Category.findOne({
            where: {
              id: category,
            },
            include: {
              model: Product,
              attributes: [
                'id',
                'name',
                'description',
                'unitPrice',
                'picture',
                'score',
              ],
              through: {
                attributes: [],
              },
            },
          });

          recProducts.push(
            pickRandom.products[
              Math.floor(Math.random() * pickRandom.products.length)
            ]
          );
        }

        // subCase 1: menos de 4

        while (recProducts.length < 4) {
          recProducts.push(
            pickRandom.products[
              Math.floor(Math.random() * pickRandom.products.length)
            ]
          );
        }

        return res.json(recProducts); // CASE 2
      }
    } else {
      // no tiene favoritos y no pide recommended
      if (isRecommended !== 'true') {
        return res.send(null).status(204); // CASE 3
      }

      // no tiene favoritos y pide recommended

      let randomProducts = [
        Math.floor(Math.random() * totalProducts),
        Math.floor(Math.random() * totalProducts),
        Math.floor(Math.random() * totalProducts),
        Math.floor(Math.random() * totalProducts),
      ];

      recProducts = await Product.findAll({
        where: {
          id: { [Sequelize.Op.in]: randomProducts },
        },
      });

      return res.send(recProducts); // CASE 4
    }
  } catch (err) {
    res.json(err);
    return console.log(err);
  }
};
