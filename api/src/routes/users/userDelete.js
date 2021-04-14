const { User, Product, Order, OrderDetail } = require("../../db.js");

module.exports = async (req, res, next) => {
  var code = req.params.id;
 
  var user = await User.findOne({
    where: {
      id: code,
    },
    include: {
        model: Order,
        include: [{
            model: OrderDetail,
            include: Product
        }]
      }
    
  });
  
  if (user) {
    await user.destroy();
    return res.json({ suceffullyDelete: "user has been deleted" });
  } else {
    return res.json({ error: "that user cannot be find" }).status(400);
  }
};