const { User, Timeslots, Location } = require('../../db.js');

module.exports = async (req, res) => {
    const userId = parseInt(req.params.id)
    
    const user = await User.findOne({
        where: {
            id: userId,
        },
        attributes: ['firstName', 'lastName'],
        include: {
            model: Timeslots,
            attributes: ['id', 'date', 'time'],
            include: {
                model: Location
            }
        }
    })

    let userTimeslots = user.dataValues.timeslots.map(timeslot => {
        return {
            id: timeslot.dataValues.id,
            date: timeslot.dataValues.date,
            time: timeslot.dataValues.time,
            location: timeslot.dataValues.location,
        }
    })

    res.json(userTimeslots)
}