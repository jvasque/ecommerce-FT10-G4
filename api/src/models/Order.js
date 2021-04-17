const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('order', {
    status: {
      type: DataTypes.STRING,
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
