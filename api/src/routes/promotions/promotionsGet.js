const { Product, Promotion } = require("../../db.js");

module.exports = async (req, res) => {

    const findPromotion = await Promotion.findAll();

    if(!findPromotion) return res.json({error: "There are not any promotion yet!"});

    return res.json(findPromotion);
};