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
//             '. .'  /--.--\  . .'
//          ."" '<  ._<|>/_.' >' "".
//         | | :  - .;\ _ /;./ -  : | |
//         \  \ _.   \_ __\ /__ _/   .- /  /
//     =====-.____. ___/__.-___.-'=====
//                       =---='
//     ~~~~~~~~~~~
const server = require("./src/app.js");
const { conn, Product, Category } = require("./src/db.js");
let products = require("./src/data/products");
let categories = require("./src/data/categories");

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  server.listen(3001, async function () {
    console.log("Server is listening on port 3001!");

    // for (let j = 0; j < categories.length; j++) {
    //   await Category.create({
    //     name: categories[j].name,
    //   });
    // }

    // for (let i = 0; i < products.length; i++) {
    //   let myProduct = await Product.create({
    //     name: products[i].name,
    //     SKU: products[i].SKU,
    //     unitPrice: products[i].unitPrice,
    //     description: products[i].description,
    //     picture: products[i].picture,
    //     score: products[i].score,
    //     unitsOnStock: products[i].unitsOnStock,
    //   });
    //   const findCategory = await Category.findOne({
    //     where: {
    //       name: products[i].categoryCategoryId,
    //     },
    //   });
    //   await myProduct.setCategory(findCategory);
    // }

    

  });

  categories = categories.map(category => {
    return Category.create({
          name: category.name,
    });
  })

  categories = await Promise.all(categories)

  let categoryProduct = products.map(result => result.categoryCategoryId)  

  categoryProduct = await Promise.all(categoryProduct.map(async (arr) => {
    return await Promise.all(arr.map(async (el) => {
        let [createdCategory, created] = await Category.findOrCreate({
          where: {name: el}
        })                  
        return createdCategory
      }
    ))
  }))

  products = products.map(product => {
    return Product.create({
      name: product.name,
      SKU: product.SKU,
      unitPrice: product.unitPrice,
      description: product.description,
      picture: product.picture,
      score: product.score,
      unitsOnStock: product.unitsOnStock,
    })
  })

  products = await Promise.all(products)

  await Promise.all(products.map(async (item, index) => {
      await item.addCategories(categoryProduct[index])
  }))

  Promise.all([...categories])
    .then(res => {
      console.log("Cargados Productos y Categorias");
    }).catch(err => {
      console.log("Dietas y Tipos de platos ya precargados")
  })

});