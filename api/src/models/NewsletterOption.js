const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("newsletterOption", {
    newsletterOptionId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
        unique: true,
    },
    boletinesInformativos: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    promociones: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    nuevosLanzamientos: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
};
