const { User, Product, Order, OrderDetail } = require("../../db.js");

module.exports = async (req, res) => {
  try {
    if (req.user.type === "admin" || "superadmin") {
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
      const users = data
        .map((d) => d.dataValues)
        .sort(function (a, b) {
          if (a.id > b.id) {
            return 1;
          }
          if (a.id < b.id) {
            return -1;
          }
          return 0;
        });
      return res.json(users);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.json(err);
    return console.log(err);
  }
};
