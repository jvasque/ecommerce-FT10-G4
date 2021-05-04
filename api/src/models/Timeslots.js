const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define('timeslots', {
    date: {
      type: DataTypes.DATEONLY,//"2021-02-01"
      allowNull: false,
      unique: false,
    },
    time: {
      type: DataTypes.ENUM("9","10","11","12","13","14","15","16","17"),
      allowNull: false,
      unique: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 9,
    },
  });
};


