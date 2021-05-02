const { User } = require("../../db.js");
module.exports = async function (req, res) {
  console.log(req.params.id);
  try {
    const userD = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(userD);
  } catch (error) {
    console.log(error);
  }
};
