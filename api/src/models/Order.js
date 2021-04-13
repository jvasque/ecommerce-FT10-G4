const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("order", {
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    productAmount: {
      type: DataTypes.INTEGER,
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
    paymentMethod: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.ENUM({
        values: ["cart", "created", "processing", "cancelled", "completed"],
        allowNull: false,
      }),
    },
  });
};
