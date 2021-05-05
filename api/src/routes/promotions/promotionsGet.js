const { Product, Promotion, Category } = require("../../db.js");

module.exports = async (req, res) => {

    const findPromotion = await Promotion.findAll({
        include: [{
            model: Product,
            include: [{
                model: Category
            }]
        }] //{ all: true }
    });

    if(!findPromotion) return res.json({error: "There are not any promotion yet!"});

    return res.json(findPromotion);
};