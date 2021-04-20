const users = require("../../data/users.js");
const { User, Order, OrderDetail, Product, PaymentMethod } = require("../../db.js");
const { Op } = require("sequelize");

module.exports = async (req, res) => {
    const {created, processing, completed, cancelled} = req.query
    let filter = []
    if(created === 'false' && processing === 'false' && completed === 'false' && cancelled === 'false'){
        filter = ['created', 'processing', 'completed', 'cancelled']
    }else{
        if(created === 'true') {filter.push('created')}
        if(processing === 'true') {filter.push('processing')}
        if(completed === 'true') {filter.push('completed')}
        if(cancelled === 'true') {filter.push('cancelled')}
    }
    const data = await Order.findAll({
        where: {
            state: {
                [Op.in] : filter
            }
        }, 
        attributes: ['id', 'state','createdAt', 'updatedAt', 'totalPrice'],
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
        },{
            model: User,
            attributes: ['firstName', 'lastName', 'companyName']
        }]
    });

    return res.json(data);
};