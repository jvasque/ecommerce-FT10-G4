const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define("orderDetail",{
      quantity:{
        type:DataTypes.INTEGER
      },
      orderDate:{
        type:DataTypes.DATE
      }
    })
}