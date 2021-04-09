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
const { conn, Product, Category } = require("./src/db.js");
const products = require("./src/data/products");
const categories = require('./src/data/categories');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, async function () {
    console.log("Server is listening on port 3001!");

    for (let i = 0; i < products.length; i++) {
      await Product.create(products[i]);
    }

    for (let j = 0; j < categories.length; j++) {
      await Category.create(products[j]);
      
    }

    console.log("Products and categories pre charged");
  });
});
