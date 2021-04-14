const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("review", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    score: {
        type: DataTypes.ENUM("0", "1", "2", "3", "4", "5"),        
    },
    content: {
      type: DataTypes.STRING,
    },
  });
};