const Sequelize = require('sequelize');
const { Product } = require('../../db.js');

// /products/higher

module.exports = async (req, res, next) => {
    let totalProducts = await Product.findAndCountAll();
    console.log(totalProducts)
    try {
        let sortedScores = totalProducts.rows.sort(function (a, b) {
            if (a.score > b.score) {
              return -1;
            }
            if (a.score < b.score) {
              return 1;
            };
            return 0;
        });
        
        let fourSorted = [
            sortedScores[0],
            sortedScores[1],
            sortedScores[2],
            sortedScores[3]
        ]
        return res.json(fourSorted).status(200);     
    } catch (error) {
        res.json(err);
        return console.log(err);
    }
}
