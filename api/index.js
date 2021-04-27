//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const {
  conn,
  Brand,
  Category,
  Favorite,
  Location,
  Order,
  OrderDetail,
  PaymentMethod,
  Product,
  Review,
  SubCategory,
  UnitsOnLocation,
  User,
  Wishlist,
} = require('./src/db.js');

// precharged data
const products = require('./src/data/products');
const categories = require('./src/data/categories');
const subcategories = require('./src/data/subcategories');
const favorites = require('./src/data/favorites');
const locations = require('./src/data/locations');
const newsletter = require('./src/data/newsletterOptions');
const orderDetails = require('./src/data/orderDetails');
const orders = require('./src/data/orders');
const paymentMethods = require('./src/data/paymentMethods');
const reviews = require('./src/data/reviews');
const unitsOnLocations = require('./src/data/unitsOnLocations');
const users = require('./src/data/users');
const wishlists = require('./src/data/wishlists');
const { Op } = require('sequelize');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, async function () {
    console.log('Server is listening on port 3001!');

    //SubCategory Creation and Association
    await SubCategory.bulkCreate(subcategories);

    for (let i = 0; i < categories.length; i++) {
      const findSubCategory = await SubCategory.findAll({
        where: {
          id: {
            [Op.in]: categories[i].subId,
          },
        },
      });

      let [myCategory] = await Category.findOrCreate({
        where: {
          name: categories[i].name,
        },
      });
      await myCategory.setSubCategories(findSubCategory);
    }

    //PaymentMethod  & OrderDetail creation
    await PaymentMethod.bulkCreate(paymentMethods);
    await OrderDetail.bulkCreate(orderDetails);

    //Order creation and association
    for (let i = 0; i < orders.length; i++) {
      const findOrderDetail = await OrderDetail.findAll({
        where: {
          id: {
            [Op.in]: orders[i].orderDetId,
          },
        },
      });
      const findPaymentMethod = await PaymentMethod.findByPk(
        orders[i].paymentMethod
      );

      const myOrder = await Order.create({
        state: orders[i].status,
        totalPrice: orders[i].totalPrice
      });
      await myOrder.setOrderDetails(findOrderDetail);
      await myOrder.setPaymentMethod(findPaymentMethod);
    }

    //Review creation
    for (let i = 0; i < reviews.length; i++) {
      const myReview = await Review.create({
        score: reviews[i].score,
        content: reviews[i].content,
      });
      const findOrderDetail = await OrderDetail.findByPk(i + 1);
      findOrderDetail.setReview(myReview)
    }

    //Product creation and association
    for (let i = 0; i < products.length; i++) {
      const findCategory = await Category.findAll({
        where: {
          id: {
            [Op.in]: products[i].catId,
          },
        },
      });
      const findSubCategory = await SubCategory.findAll({
        where: {
          id: {
            [Op.in]: products[i].subId,
          },
        },
      });
      const findOrderDetail = await OrderDetail.findAll({
        where: {
          id: {
            [Op.in]: products[i].orderDetId,
          },
        },
      });
      let score = products[i].score.toString();

      const [myProduct] = await Product.findOrCreate({
        where: {
          name: products[i].name,
          SKU: products[i].SKU,
          unitPrice: products[i].unitPrice,
          description: products[i].description,
          picture: products[i].picture,
          score: score,
          unitsOnStock: products[i].unitsOnStock,
        },
      });
      await myProduct.setCategories(findCategory);
      await myProduct.setSubCategories(findSubCategory);
      await myProduct.setOrderDetails(findOrderDetail);
    }   

    // User creation and association

    for (let i = 0; i < users.length; i++) {
      const findReview = await Review.findAll({
        where: {
          id: {
            [Op.in]: users[i].reviews,
          },
        },
      });
      const findProduct = await Product.findAll({
        where: {
          id: {
            [Op.in]: users[i].products,
          },
        },
      });
      const findPaymentMethod = await PaymentMethod.findAll({
        where: {
          id: {
            [Op.in]: users[i].payId,
          },
        },
      });
      const myFavorites = await Favorite.create();
      const favProducts = await Product.findAll({
        where: {
          id: {
            [Op.in]: favorites[i].prodId,
          },
        },
      });

      myFavorites.addProducts(favProducts);

      const myWishlist = await Wishlist.create({ name: 'lista' + (i + 1) });
      const wishProducts = await Product.findAll({
        where: {
          id: {
            [Op.in]: wishlists[i].prodId,
          },
        },
      });
      myWishlist.addProducts(wishProducts);

      const [myUser] = await User.findOrCreate({
        where: {
          type: users[i].type,
          firstName: users[i].firstName,
          lastName: users[i].lastName,
          companyName: users[i].companyName,
          email: users[i].email,
          password: users[i].password,
          phone: users[i].phone,
          photoURL: users[i].photoURL || "",
          address: users[i].address,
        },
      });

      await myUser.addReviews(findReview);
      await myUser.addProducts(findProduct);
      await myUser.setFavorite(myFavorites);
      await myUser.addWishlists(myWishlist);
      await myUser.addPaymentMethods(findPaymentMethod);
    }

    // Other Associations
    for (let i = 0; i < users.length; i++) {
      const findUser = await User.findByPk(i + 1);
      const findOrder = await Order.findAll({
        where: {
          id: {
            [Op.in]: users[i].orderId,
          },
        },
      });
      await findUser.setOrders(findOrder);
    }

    for(let i = 0; i < reviews.length; i++){
      const theOrderDetail = await OrderDetail.findOne({
        where: {
            id: i+1
        },
        include: [{
          model: Product,
          attributes: ['id']
        }]
      })
      const productReviewId = theOrderDetail.dataValues.productId
      const theProduct = await Product.findOne({
        where: {
          id: productReviewId
        }
      })
      const theReview = await Review.findByPk(i+1)
      theReview.setProduct(theProduct)      
    }

    //Locations and stock creation
    await Location.bulkCreate(locations);
    await UnitsOnLocation.bulkCreate(unitsOnLocations);
    for(let i = 0; i < unitsOnLocations.length; i++){
      const units = await UnitsOnLocation.findByPk(i+1)
      const loc = await Location.findByPk(unitsOnLocations[i].location)      
      await units.setLocation(loc)
    }

    //Association to several 

    for(let i = 0; i < 5; i++){
      const productStock = await Product.findByPk(i+1)
      const unitsLocProd = await UnitsOnLocation.findAll({
        where: {
          id: {
            [Op.in]: products[i].unitsLocId,
          },
        },
      })
      await productStock.addUnitsOnLocations(unitsLocProd)
    }

    //Location everyone else
    const locDefault = await Location.findByPk(1)
    for(let i = 5; i < products.length; i++){
      const prodStock = await Product.findByPk(i+1)
      const unitsOnStock = await UnitsOnLocation.create({unitsOnStock: products[i].unitsOnStock})
      await locDefault.addUnitsOnLocations(unitsOnStock)
      await prodStock.addUnitsOnLocations(unitsOnStock)
    }

    console.log('Products and categories pre charged');
  });
});
