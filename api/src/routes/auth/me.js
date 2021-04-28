
const { User } = require("../../db.js");

module.exports = async (req, res, next) => {
    try {
      if (req.user) {
        const { id } = req.user;
        const result = await User.findByPk(id);
        res.json(result);
      } else res.sendStatus(401);
    } catch (error) {
      next(error);
    }
  }