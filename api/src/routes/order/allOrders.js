const { Order } = require("../../db.js");


module.exports = async (req, res) => {
  const {email}= req.body
  const data = await Order.findAll({ where: { state: "cart"/*, email:email*/ } });
  return res.json(data);

  // const data = await Order.findAll({include: {all: true}, where:{id:parseInt(req.params.id)}});
  // res.json(data);
};
