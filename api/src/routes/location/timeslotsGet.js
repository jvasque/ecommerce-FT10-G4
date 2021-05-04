const { Location, Timeslots } = require('../../db.js');

module.exports = async (req, res) => {
    const locationId = parseInt(req.params.id)
    
    const location = await Location.findOne({
        where: {
            id: locationId,
        },
        include: {
            model: Timeslots,
            where:{
                capacity: 0,
            },
            attributes: ['id', 'date', 'time', 'capacity']
        }
    })

    let disableDates = location.dataValues.timeslots.map(timeslot => {
        return {
            id: timeslot.dataValues.id,
            date: timeslot.dataValues.date,
            time: timeslot.dataValues.time,
            capacity: timeslot.dataValues.capacity,
        }
    })

    res.json(disableDates)
}