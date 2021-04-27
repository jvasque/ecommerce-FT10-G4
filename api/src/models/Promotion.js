const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("promotion", {
    description: {
      type: DataTypes.TEXT,
    },
    discountDate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
          min: 0,
          max: 99
      },
    },
    combo: {
      type: DataTypes.INTEGER
    },
   
    days: {
      type: DataTypes.ENUM({values: ["0", "1", "2", "3", "4" ,"5" ,"6"]}),
    },
    
  });
};
