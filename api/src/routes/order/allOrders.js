const { Order } = require("../../db.js");

module.exports = async (req, res) => {

  const {status} = req.body
  console.log(req.params.id)
 if(status){
  const data = await Order.findAll({where:{state:status}});
  return res.json(data);
 }
 
  const data = await Order.findAll({include: {all: true}, where:{id:parseInt(req.params.id)}});
  res.json(data);
};
