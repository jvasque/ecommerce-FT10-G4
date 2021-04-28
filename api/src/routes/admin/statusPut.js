const { User, Order, OrderDetail, Product, PaymentMethod } = require("../../db");

module.exports = async (req, res, next) => {
    let code = req.params.id;
    let {change} = req.body 
    let token =req.user
    
    try{
        if(token.type === "admin" ||token.type === "superadmin" ){
            const user = await User.findOne({
            where:{
                id: code
            }
        })
       
        if (user.dataValues){
           
            await user.update({type: change});
            
            res.status(200);
            return res.json(user);
        }
        else{
            res.status(400);
            return res.json({error: "that user cannot be find"});
        }}else{
            return res.status(401).json({message: "Unauthorized"})
        }
    } catch (error) {        
        next(error);
    }    
};
  