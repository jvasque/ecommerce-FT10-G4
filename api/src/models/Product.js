const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Product = sequelize.define('product', {
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
      
    },
    unitsOnStock:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });

  Product.addHook('beforeValidate', (product) => {
    let word = product.name.toLowerCase();
    let upper = word.split(' ');
    for(let i=0;i<upper.length;i++){
      upper[i] = upper[i][0].toUpperCase()+ upper[i].slice(1);
    };
    product.name = upper.join(' ');
  });
}; 
 