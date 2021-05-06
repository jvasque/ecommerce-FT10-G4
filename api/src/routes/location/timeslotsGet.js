const { Op } = require('sequelize');
const { Location, Timeslots } = require('../../db.js');
const { addDays } = require("date-fns");

module.exports = async (req, res) => {
  const locationId = parseInt(req.params.id);

  let today = new Date();
  let weekEnd = addDays(today,7);

  const location = await Location.findOne({
    where: {
      id: locationId,
    },
    include: {
      model: Timeslots,
      where: {
        capacity: 0,
        date: { [Op.between]: [today, weekEnd] },
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
      };
    });
    return res.json(disabledDates);
  } else {
    return res.json([]);
  }
};
