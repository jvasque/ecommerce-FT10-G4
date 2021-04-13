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
const server = require("./src/app.js");
const { conn, Product, Category, SubCategory } = require("./src/db.js");
const products = require("./src/data/products");
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
const { Op } = require("sequelize");

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, async function () {
    console.log("Server is listening on port 3001!");
    
    for (let i = 0; i < subcategories.length; i++) {
      await SubCategory.create({
        name: subcategories[i].name
      }); 
    }

    for (let i = 0; i < categories.length; i++) {
      const findSubCategory = await SubCategory.findAll({
        where: {
          subCategoryId: {
            [Op.in]: categories[i].subcategorySubcategoryId
          }
        }
      })

      let [myCategory, created] = await Category.findOrCreate({
        where: {
          name: categories[i].name
        }
      }); 
      await myCategory.setSubCategories(findSubCategory);
    }
    

    for (let i = 0; i < products.length; i++) {
      const findCategory = await Category.findAll({
        where:{
          categoryId: {
            [Op.in]: products[i].categoryCategoryId
          }
        }
      })
      let score = products[i].score.toString()   
      let [myProduct, created] = await Product.findOrCreate({
        where:{
        name: products[i].name ,
        SKU:products[i].SKU  ,
        unitPrice:products[i].unitPrice  ,
        description:products[i].description  ,
        picture:JSON.stringify(products[i].picture)  ,
        score:score  ,
        unitsOnStock: products[i].unitsOnStock 
        }
      });     
      await myProduct.setCategories(findCategory);
    }

    console.log("Products and categories pre charged");
  });
});
