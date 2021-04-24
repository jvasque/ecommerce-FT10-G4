const Sequelize = require('sequelize');
const { Product, Category } = require("../../db.js");
// /products/filter?recommended=[true/false]

module.exports = async (req, res, next) => {
  let { array } = req.body;

  try {
    //devuelve todos los favoritos
    let favProducts = await Product.findAll({
      attributes: ['id','name','description','unitPrice', 'picture','score'],      
      where: {
        id: { [Sequelize.Op.in]: array },
      },
      include: {
        model: Category,
        through: {
          attributes: [],
        },        
      }
    });
    
    //si hay que buscar recomendados
    if (req.query.recommended === "true") {
      let data = favProducts.map((product) => {
        return product.categories[0].id
      })
      
      let newData = [];      
      for (let i = 0; i < data.length; i++) {
        const category = data[i];
        let search = await Category.findOne({
          where: {
            id: category
          },
          include: {
            model: Product,
            attributes: ['id','name','description','unitPrice', 'picture','score'],
            through: {
              attributes: [],
            }, 
          }
        });
        newData.push(search.products[Math.floor(Math.random() * search.products.length)])
        
      }

      while (newData.length < 3) {        
        newData.push(favProducts[Math.floor(Math.random() * favProducts.length)])
      }
      
      return res.json(newData)      
    } 

    return res.json(favProducts);
  } catch (err) {
    res.json(err);
    return console.log(err);
  }
};
