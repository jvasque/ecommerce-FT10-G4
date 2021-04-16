const { User, Order, OrderDetail, Product } = require("../../db");

module.exports = async (req, res, next) => {
    let userId = 1; 
    let productId = 10;
    let findUser = await User.findOne({ 
        where: { 
            userId: userId
        },
        include:[{
            model: Order,
            include: OrderDetail
        }]
    })

    let myOrder = findUser.orders.filter(order => {
        return order.status === 'CART'
    })

    let myOrderId = myOrder[0].dataValues.id
    let findOrder = await Order.findOne({ 
        where: { 
            id: myOrderId
        },
        include:[{
            model: OrderDetail 
        }]
    })
    let myOrderDetail = findOrder.orderDetails.filter(orderDetail => {
        return orderDetail.productId === productId
    })

    if(myOrderDetail.length === 1){
        let myOrderDetailId = myOrderDetail[0].dataValues.id
        let findOrderDetail = await OrderDetail.findByPk(myOrderDetailId)
        findOrderDetail.quantity = findOrderDetail.quantity + 1;
        await findOrderDetail.save();
        return res.json(findUser);
    }

    let newOrderDetail = await OrderDetail.create({
            quantity: 1
    })

    let findProduct = await Product.findOne({ 
        where: { 
            id: productId
        },
    })

    newOrderDetail.setOrder(findOrder)
    newOrderDetail.setProduct(findProduct)
    
    return res.json(findUser);    
};
  