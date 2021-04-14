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
  User,
  Wishlist,
} = require('./src/db.js');
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
    //SubCategory Creation
    for (let i = 0; i < subcategories.length; i++) {
      await SubCategory.create({
        name: subcategories[i].name,
      });
    }
    //Category creation and association
    for (let i = 0; i < categories.length; i++) {
      const findSubCategory = await SubCategory.findAll({
        where: {
          id: {
            [Op.in]: categories[i].subcategorySubcategoryId
          }
        }
      })

      let [myCategory, created] = await Category.findOrCreate({
        where: {
          name: categories[i].name,
        },
      });
      await myCategory.setSubCategories(findSubCategory);
    }

    //PaymentMethod
    for (let i = 0; i < paymentMethods.length; i++) {
      await PaymentMethod.create({
        type: paymentMethods[i].type,
      });
    }

    //OrderDetail creation
    for (let i = 0; i < orderDetails.length; i++) {
      await OrderDetail.create({
        quantity: orderDetails[i].quantity,
      });
    }

    //Order creation and association
    for (let i = 0; i < orders.length; i++) {
      const findOrderDetail = await OrderDetail.findAll({
        where:{
          id: {
            [Op.in]: orders[i].orderDetailOrderDetailId
          }
        }
      })   
      const findPaymentMethod = await PaymentMethod.findByPk(orders[i].paymentMethod)

      let myOrder = await Order.create({
        status: orders[i].status,
      });
      await myOrder.setOrderDetails(findOrderDetail);
      await myOrder.setPaymentMethod(findPaymentMethod);
    }

    //Review creation
    for (let i = 0; i < reviews.length; i++) {
      let myReview = await Review.create({
        score: reviews[i].score,
        content: reviews[i].content,
      });
      const findOrderDetail = await OrderDetail.findByPk(i + 1);
      await findOrderDetail.setReview(myReview);
    }

    //Product creation and association
    for (let i = 0; i < products.length; i++) {
      const findCategory = await Category.findAll({
        where:{
          id: {
            [Op.in]: products[i].categoryCategoryId
          }
        }
      })
      const findSubCategory = await SubCategory.findAll({
        where:{
          id: {
            [Op.in]: products[i].subcategorySubcategoryId
          }
        }
      })
      const findOrderDetail  = await OrderDetail.findAll({
        where:{
          id:{
            [Op.in]: products[i].orderDetailOrderDetailId
          }
        }
      })
      let score = products[i].score.toString()   
      let [myProduct, created] = await Product.findOrCreate({
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

    //User creation and association
    for (let i = 0; i < users.length; i++){
      const findReview  = await Review.findAll({
        where:{
          id:{
            [Op.in]: users[i].reviews
          }
        }
      })
      const findProduct = await Product.findAll({
        where: {
          id: {
            [Op.in]: users[i].products
          }
        }
      })
      const findPaymentMethod = await PaymentMethod.findAll({
        where: {
          id: {
            [Op.in]: users[i].paymentMethodpaymentMethodId
          }
        }
      })
      let [myFavorite, favCreated] = await Favorite.findOrCreate({
        where:{
          id: i+1
        }
      });
      let [myWishlist, wishCreated] = await Wishlist.findOrCreate({
        where:{
          id: i+1
        }
      });
      let [myUser, created] = await User.findOrCreate({
        where: {
          type: users[i].type,
          firstName: users[i].firstName,
          lastName: users[i].lastName,
          companyName: users[i].companyName,
          email: users[i].email,
          password: users[i].password,
          phone: users[i].phone,
          address: users[i].address,
        },
      });
      await myUser.setReviews(findReview);
      await myUser.hasProducts(findProduct);
      await myUser.setFavorite(myFavorite);
      await myUser.setWishlists(myWishlist);
      await myUser.setPaymentMethods(findPaymentMethod);
    }

    for (let i = 0; i < users.length; i++) {
      const findUser = await User.findByPk(i + 1);
      const findOrder = await Order.findAll({
        where: {
          id: {
            [Op.in]: users[i].orderOrderId
          }
        }
      })
      await findUser.setOrders(findOrder)
    }
    for (let i = 0; i < products.length; i++) {
      const findUser = await User.findByPk(products[i].userUserId);
      const findProduct = await Product.findByPk(i + 1);
      const findFavorite = await Favorite.findAll({
        where: {
          id: {
            [Op.in]: products[i].favoriteFavoriteId
          }
        }
      })
      const findWishlist = await Wishlist.findAll({
        where: {
          id: {
            [Op.in]: products[i].wishListWishListId
          }
        }
      })
      await findProduct.setUser(findUser)
      await findProduct.setFavorites(findFavorite)
      await findProduct.setWishlists(findWishlist)
    }

    let [newWish] = await Wishlist.findOrCreate({
      where: {
        id: 15,
      },
      defaults: {
        name: 'wishlist15',
      },
    });

    let newUser = await User.findByPk(2);
    await newUser.addWishlists(newWish);
    console.log('Products and categories pre charged');
  });
});
