const { Category } = require("../../db.js");
const { Sequelize, Op } = require('sequelize');


module.exports = async (req, res) => {
    let  code  = req.body.params;
    console.log(code)
    if(code) {
        const data = await Category.findAll({
          where: {
              id:{
                  [Op.in]: code,
                }
            },
        });
        res.json(data);
    }else{
        res.json({error: "req.body.params most be an id's array"})
    }
};
