const { User, Order, OrderDetail, Product, PaymentMethod } = require("../../db");

module.exports = async (req, res, next) => {
    let id = req.params.id; 
    try{
        let data = await User.findOne({ 
            where: { 
                id: id 
            },
        include:[{
            model: Order,
            attributes: ['id', 'status','createdAt', 'updatedAt', 'totalPrice'],
            include: [{
                model: OrderDetail,
                attributes: ['id','quantity', 'unitPrice'],
                include: [{
                    model: Product,
                    attributes: ['id', 'name', 'picture', 'unitPrice'],
                }]
            },{
                model: PaymentMethod,
                attributes: ['type'],
            }]
        }]})
        return res.json(data.orders);
    } catch (err) {        
        return res.json(err);
    }    
};
  