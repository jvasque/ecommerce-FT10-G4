const users = require("../../data/users.js");
const { User, Order, OrderDetail, Product, PaymentMethod } = require("../../db.js");

module.exports = async (req, res) => {
    const data = await Order.findAll({
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