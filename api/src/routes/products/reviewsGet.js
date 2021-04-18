const { Product, Review, User, Order, OrderDetail } = require("../../db.js");
const { Op } = require("sequelize");

module.exports = async (req, res, next) => {

    let id = req.params.id;

    if(!id) return res.json({error: "please, give us an id"})
    try {
      let data = await Review.findAll({
        where:{
          productId:id
        },
        order: [
          ['createdAt', 'DESC']
        ],
        include:[{
          model: OrderDetail,
         /*  where: {
            productId: {
              [Op.in]:[id , null] //NO ANDAAA
            }
          }, */
          include: [{
            model: Order,
            attributes: ['userId']
          }]
        }, {model: User}]
      });

      if(!data) return res.json({error: "there are not reviews for this product"})
      return res.json(data);
    } catch (err) {
      res.json(err);
      return console.log(err);
    }
  };
  