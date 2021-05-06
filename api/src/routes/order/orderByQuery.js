const { Order } = require("../../db.js");

module.exports = async(req,res)=> {
  const data = await Order.findAll({ where:{
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    phoneNumber:req.query.phoneNumber,
    state:req.query.state
}});
   res.json(data);
}