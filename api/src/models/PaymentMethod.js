const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define("paymentMethod",{
      type:{
        type:DataTypes.STRING
      }
    })
}