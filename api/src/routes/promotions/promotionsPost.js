const { Product, Promotion, Category } = require("../../db.js");
const { Op } = require('sequelize');

module.exports = async (req, res) => {

    let { products, categories, description, discountDate, combo, days } = req.body;

    //Los dias se reciben: 0123456, 035, 16, 23
    //Verificar que no se repitan, y que no salgan del rango 0-6
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
    //Si da falso lo rebotamos
    if(!daysVerification(days)) return res.json({error: "Invalid days"});

    //Si da verdadero, lo pasamos a un string de numeros para mandarlo a la DB
    
    let stringDays = days.join("");
    
    //Validamos el porcentaje de descuento (1-99)
    if(discountDate < 1 || discountDate > 99) return res.json({error: "discount date must be between 1 and 99 percent"})

    //Para que la sub-query funcione, categories tiene que ser un array de id's de las categorias: [1,2,3,4,...]

    //Si me mandan categorias, tengo que encontrar todos los productos que estan relacionados a esas categorias
    
    let arrProductsCategories = [];
    let arrProductsIds = [];
    
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
        })

        if(!findProductsCategory){
            arrProductsCategories = [];
        } else {
            arrProductsCategories = findProductsCategory;
        }
    }

    if(products){
        const findProductsIds = await Product.findAll({
            where: {
                id: {
                    [Op.in]: products
                }
            }
        })

        if(!findProductsIds){
            arrProductsIds = [];
        } else {
            arrProductsIds = findProductsIds;
        }
    }

    let finalArray = arrProductsIds.concat(arrProductsCategories);
    let idFinalArray = finalArray?.map((o) => o.dataValues.id)
    let resArr = [...new Set(idFinalArray)]

    if(!resArr) return res.json({error: "There aren't products in those categories id's or products id's"}); 

    const [promotionCreate, created] = await Promotion.findOrCreate({
        where: {
            description,
            discountDate,
            combo,
            days: stringDays
        }
    });

   


    await promotionCreate.setProducts(resArr);

    return res.json(promotionCreate);
};