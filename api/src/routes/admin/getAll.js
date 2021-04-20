const {
  User,
  Order,
  OrderDetail,
  Product,
  PaymentMethod,
} = require("../../db");

module.exports = async (req, res, next) => {
  const token = req.user;
  try {
    if (token.type === "admin" || token.type === "superadmin") {
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
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (e) {
    next(e);
  }
};
