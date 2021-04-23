const { Product, Review, User, Order, OrderDetail } = require("../../db.js");
const { Op } = require("sequelize");

module.exports = async (req, res, next) => {

    let { id } = req.params;
    let { pagination } = req.query;

    if(!id) return res.json({error: "please, give us an id"})
    try {
      let data = await Review.findAll({
        where:{
          productId:id
        },
        offset: pagination || 0,
        limit: 2,
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
      let usersCommented = await Review.findAll({
        where: {
          productId: id
        },
        attributes: ['userId']
      });

      let arrUsersCommented = usersCommented?.map(e => e.userId);


      if(!data) return res.json({error: "there are not reviews for this product"})
      return res.json({data, arrUsersCommented});
    } catch (err) {
      res.json(err);
      return console.log(err);
    }
  };
  