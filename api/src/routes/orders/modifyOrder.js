const users = require("../../data/users.js");
const { Order } = require("../../db.js");

module.exports = async (req, res) => {
    const id = req.params.id
    const newState = req.query.state
    const data = await Order.findByPk(id)
    data.state = newState
    await data.save()
    return res.json(data);
};