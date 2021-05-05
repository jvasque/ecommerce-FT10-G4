const { Product, Promotion, Category } = require("../../db.js");

module.exports = async (req, res) => {
    var code = req.params.id;
    const findPromotion = await Promotion.findOne({
        where: {
            id: code,
          },
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