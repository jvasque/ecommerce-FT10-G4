const { User, Product, Order, OrderDetail } = require("../../db.js");

module.exports = async (req, res) => {
  var code = req.params.id;
  var query = req.query.status;
  var user = await User.findOne({ where: { id: code}});
  // console.log(user);
  if (user) {
    if (query === "active" || "disabled" || "banned") {
      await user.update({ status: query });
      res.status(200);
    } else {
      return res.json({error: "does not have a valid option"})
    }
    return res.json(user);
  } else {
    res.status(400);
    return res.json({ error: "that user cannot be find" });
  }
};
