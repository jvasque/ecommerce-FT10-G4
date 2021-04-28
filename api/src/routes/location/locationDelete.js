const { Location } = require('../../db.js');

module.exports = async (req, res) => {
    const locationId = req.params.id
    try{
      const location = await Location.findByPk(locationId);
      location?location.destroy():null;
      res.json(location).status(204)
    }catch(err){
      res.json(err);
      return console.log(err);
    }
};