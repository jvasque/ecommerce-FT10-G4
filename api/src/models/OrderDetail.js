const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('orderDetail', {
    quantity: {
      type: DataTypes.INTEGER,
    },
    unitPrice: {
      type: DataTypes.FLOAT,
    },
  });
};

//item en el carrito asociado a orderDetail
//para borrar,modificar product id
//Order detail
