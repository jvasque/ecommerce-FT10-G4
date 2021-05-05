const { Op } = require('sequelize');
const { Location, Timeslots } = require('../../db.js');

module.exports = async (req, res) => {
  const locationId = parseInt(req.params.id);

  let today = new Date();

  const location = await Location.findOne({
    where: {
      id: locationId,
    },
    include: {
      model: Timeslots,
      where: {
        capacity: 0,
        date: { [Op.gt]: today },
      },
      attributes: ['id', 'date', 'time', 'capacity'],
    },
  });

  if (location) {
    let disabledDates = location.dataValues.timeslots.map((timeslot) => {
      return {
        id: timeslot.dataValues.id,
        date: timeslot.dataValues.date,
        time: timeslot.dataValues.time,
        capacity: timeslot.dataValues.capacity,
      };
    });
    return res.json(disabledDates);
  } else {
    return res.json([]);
  }
};
