// users/facebook/:id
const { User } = require('../../db.js');

module.exports = async (req, res) => {
  let fbUser = req.params.id;

  try {
    let data = await User.findOne({
      where: {
        facebookUser: fbUser,
      },
    });

    return data ? res.json(data) : res.json(null);
  } catch (err) {
    res.json(err);
    return console.log(err);
  }
};
