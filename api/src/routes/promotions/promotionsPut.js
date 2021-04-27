const { Product, Promotion, Category } = require("../../db.js");
const { Op } = require('sequelize');

module.exports = async (req, res) => {

    let { products, categories, description, combo, days, active, discountDate } = req.body;
    let id = req.params.id;

    //INICIO VALIDACIONES DE DATOS
    function daysVerification (days) {
        if(days.length > 7) return false;
      
        let allowedDays = [0,1,2,3,4,5,6];
      
        let reapetedNumbers = new Set(days);
        if(reapetedNumbers.size !== days.length) return false;
      
        let res = true;
      
       for(let i = 0; i < days.length; i++){
         if(!allowedDays.includes(days[i])){
           res = false;
           break;
         }
       }
        return res;
    }

    if(!daysVerification(days)) return res.json({error: "Invalid days"});

    let stringDays = days.join("");

    if(discountDate < 1 || discountDate > 99) return res.json({error: "discount date must be between 1 and 99 percent"});

    if(typeof active !== 'boolean') return res.json({error: "active should be a boolean"});
    //FIN VALIDACIONES DATOS

    const promotionFind = await Promotion.findOne({
        where:{
            id: id
        }
    });

    if (promotionFind) {
        if(categories){
            const findProductsCategory = await Product.findAll({
                include: [{
                    model: Category,
                    where: {
                        id: {
                            [Op.in]: categories
                        }
                    }
                }]
            });
            let prodCatId = findProductsCategory.map((o) => o.dataValues.id)
            let prodId = [...products, ...prodCatId]
            let arrRes = [...new Set(prodId)]
            if(!arrRes) return res.json({error: "There aren't products in those categories id's"});
        
            await promotionFind.setProducts(arrRes);

            if(description) await promotionFind.update({description:description});
            if(combo) await promotionFind.update({combo: combo});
            if(stringDays) await promotionFind.update({days:stringDays});
            if(active) await promotionFind.update({active:active});
            if(discountDate) await promotionFind.update({discountDate:discountDate});

            return res.json(promotionFind);
        }
       
    } else {
        return res.json({error: "an error has occurred"});
    }
    return;
};