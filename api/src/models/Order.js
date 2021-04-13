const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("order", {
    cartId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    totalPrice: {
      type: DataTypes.INTEGER,
    },
    productAmount: {
      type: DataTypes.INTEGER,
    },
    creationDate:{
      type:DataTypes.DATE
    },
    paymentDate:{  
      type:DataTypes.DATE
    },
    productName: {
      type: DataTypes.STRING,
    },
    productId: {
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },   
    state: {
      type: DataTypes.ENUM({
        values: ["cart", "created", "processing", "cancelled", "completed"],
        allowNull: false,
      }),
    },
  });
};
