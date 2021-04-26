const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("order", {
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.ENUM({
        values: ["cart", "created", "processing", "cancelled", "completed"],
        allowNull: false,
      }),
    },
    creationDate: {
      type: DataTypes.STRING,
    },
    paymentDate: {
      type: DataTypes.STRING,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
    },
  });
};
