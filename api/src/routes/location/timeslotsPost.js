const { User, Timeslots } = require('../../db.js');

// /locations/:id/timeslots

module.exports = async (req, res) => {
  const { date, time, userId } = req.body;
  const { id } = req.params;

  try {
    let user = await User.findOne({
      where: {
        id: userId,
      },
      include: {
        model: Timeslots,
        where: {
          date: date,
          time: time,
        },
        through: [],
      },
    });

    // SI LA PERSONA TIENE TURNOS...
    if (user) {
      return res.json({ error: 'appointment has already made' });
    } else {
      user = await User.findByPk(userId);
    }

    let timeslot = await Timeslots.findOrCreate({
      where: {
        date: date,
        time: time,
        locationId: id,
      },
    });

    let capacity = timeslot[0].dataValues.capacity;

    if (capacity === 0) {
      return res.json({ error: 'there is no more capacity in this timeslot' });
    } else {
      await timeslot[0].update({
        capacity: capacity - 1,
      });
      timeslot[0].addUsers(user);
      return res.json(timeslot[0]);
    }
  } catch (err) {
    res.json(err);
    return console.log(err);
  }
};
