const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
    productId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    SKU: {
      type: DataTypes.STRING,
      allowNull: false
    },
    unitPrice: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false
    },
    score: {
      type: DataTypes.ENUM("1", "2", "3", "4", "5"),
      allowNull: false
    },
    unitsOnStock:{
      type: DataTypes.INTEGER,
      allowNull: false
    }

  });
};
