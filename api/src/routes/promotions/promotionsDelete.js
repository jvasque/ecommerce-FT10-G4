const { Promotion } = require("../../db.js");

module.exports = async (req, res) => {

  let code = req.params.id;
  if(!code) return res.json({error: "Please give us an Id"});

  let promotion = await Promotion.findOne({
    where: {
      id: code,
    },
  });

  if (promotion) {
    await promotion.destroy();
    return res.json({ suceffullyDelete: "product has been deleted" });
  } else {
    return res.json({ error: "that promotion cannot be find" }).status(400);
  }
};
