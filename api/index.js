//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/---'_
//                  .' \|     |// '.
//                 / \|  :  |// \
//                / | -:- |- \
//               |   | \\  -  /// |   |
//               | _|  ''---/''  |/ |
//               \  .-_  '-'  /-. /
//             '. .'  /--.--\  `. .'
//          ."" '<  .___\_<|>_/___.' >' "".
//         | | :  - `.;\ _ /;./ -  : | |
//         \  \ _.   \_ __\ /__ _/   .- /  /
//     =====-.____. ___/__.-___.-'=====
//                       =---='
//     ~~~~~~~~~~~
const server = require("./src/app.js");
const { conn, Product, Category } = require("./src/db.js");
const products = require("./src/data/products");
const categories = require("./src/data/categories");

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, async function () {
    console.log("Server is listening on port 3001!");

    for (let j = 0; j < categories.length; j++) {
      await Category.create({
        name: categories[j].name,
      });
    }

    for (let i = 0; i < products.length; i++) {
      let myProduct = await Product.create({
        name: products[i].name,
        SKU: products[i].SKU,
        unitPrice: products[i].unitPrice,
        description: products[i].description,
        picture: products[i].picture,
        score: products[i].score,
        unitsOnStock: products[i].unitsOnStock,
      });
      const findCategory = await Category.findOne({
        where: {
          name: products[i].categoryCategoryId,
        },
      });
      await myProduct.setCategories([findCategory]);
    }
  });
});
