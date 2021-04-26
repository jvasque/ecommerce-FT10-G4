const { User, Order, OrderDetail, Product, PaymentMethod } = require("../../db");

module.exports = async(req,res,next)=>{
   
    const token = req.user
    try{
if(token.type === 'admin' || token.type==='superadmin'){
    let data = await User.findAll({
        include: {
          model: Order,
          include: [
            {
              model: OrderDetail,
              include: Product,
            },
          ],
        },
      });
      
      return res.json(data)
}else{
    return res.status(401).json({message: "Unauthorized"})
}
    }catch(e){
        next(e)
    }
}
  